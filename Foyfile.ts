import path from 'path'
import { sync as glob } from 'glob'
import { task, fs } from 'foy'
import { Project } from 'ts-morph'
import repack, { Target } from 'ts-repack'

const OUTPUT_DIRECTORY: string = path.resolve('dist')
const OUTPUT_MJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, 'module')
const OUTPUT_CJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, '.')


task('clean', async () => {
  if(fs.existsSync(OUTPUT_DIRECTORY)) await fs.rmrf(OUTPUT_DIRECTORY)
  await fs.mkdir(OUTPUT_DIRECTORY)
  await fs.mkdir(OUTPUT_MJS_DIRECTORY)
})

task('build', ['clean'], async ctx => {
  repack(Target.CJS, { output: OUTPUT_CJS_DIRECTORY })
  repack(Target.MJS, { output: OUTPUT_MJS_DIRECTORY })
  ctx.run(`gen:index`)
  ctx.run(`gen:index:ns`)
})

task('release', [`build`], async ctx => {
  await ctx.exec('npm version patch')
  await fs.copy('package.json', path.resolve(OUTPUT_DIRECTORY, 'package.json'))
  await ctx.cd(OUTPUT_DIRECTORY).exec('npm publish')
})

task(`gen:index:ns`, async () => {
  const ns = glob(`src/*`).map(dirpath => dirpath.replace(/^src\//, ''))
  const indexPath: string = path.resolve(OUTPUT_DIRECTORY, `index.js`)
  const indexContent: string = ns.map(str => `export * from './${str}'`).join('\n')
  await fs.writeFile(indexPath, indexContent, `utf-8`)
  console.log(`GENERATE INDEX:\n`, indexContent)
})

task(`gen:index`, async () => {
  const project = new Project({
    skipFileDependencyResolution: true
  })
  const ns = glob(`src/*`).map(dirpath => dirpath.replace(/^src\//, ''))
  ns.forEach(async str => {
    const indexPath: string = path.resolve(OUTPUT_DIRECTORY, str, `index.js`)
    const files: string[] = glob(`src/${str}/*.ts`).filter(filepath => !filepath.match(/test/))
    const indexContent = files.map(file => {
      const sourceFile = project.addExistingSourceFile(path.resolve(file))
      const exportSymbols = sourceFile.getExportSymbols().map(sym => sym.compilerSymbol.name).filter(exporter => exporter !== `default`)
      const defaultExportSymbol = sourceFile.getDefaultExportSymbol()
      project.removeSourceFile(sourceFile)
      const filename = path.basename(file, path.extname(file))
      return `export { ${exportSymbols.join(', ')}${defaultExportSymbol ? `, default as ${filename}` : ``} } from './${filename}'`
    }).join('\n')

    await fs.writeFile(indexPath, indexContent, `utf-8`)
    console.log(`GENERATE ${str} INDEX:\n`, indexContent)
  })
})

task('test', async ctx => {
  await ctx.exec('jest')
})

task('test:watch', async ctx => {
  await ctx.exec('jest --watch')
})
