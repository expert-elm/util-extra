import path from 'path'
import { sync as glob } from 'glob'
import { task, fs } from 'foy'
import { Project, ts, SourceFile } from 'ts-morph'
import repack, { Target } from 'ts-repack'

const OUTPUT_DIRECTORY: string = path.resolve('dist')
const OUTPUT_MJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, 'module')
const OUTPUT_CJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, '.')


task('clean', async () => {
  if(fs.existsSync(OUTPUT_DIRECTORY)) await fs.rmrf(OUTPUT_DIRECTORY)
  await fs.mkdir(OUTPUT_DIRECTORY)
  await fs.mkdir(OUTPUT_MJS_DIRECTORY)
})

task('build:cjs', async () => {
  repack(Target.CJS, { output: OUTPUT_CJS_DIRECTORY })
})

task('build:mjs', async () => {
  repack(Target.MJS, { output: OUTPUT_MJS_DIRECTORY })
})

task('build', ['clean'], async ctx => {
  ctx.run(`build:cjs`)
  ctx.run(`build:mjs`)
  ctx.run(`gen:index`)
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

task(`gen:index`, [`gen:index:cjs`.async(), `gen:index:mjs`.async()])

task(`gen:index:cjs`, async () => {
  genIndexNS(ts.ModuleKind.CommonJS, OUTPUT_CJS_DIRECTORY, `.js`)
})

task(`gen:index:mjs`, async () => {
  genIndexNS(ts.ModuleKind.ESNext, OUTPUT_MJS_DIRECTORY, `.mjs`)
})

async function genIndexNS(moduleKind: ts.ModuleKind, output: string, extname: string) {
  const project = new Project({
    tsConfigFilePath: path.resolve('./tsconfig.json'),
    skipFileDependencyResolution: true,
    addFilesFromTsConfig: false,
    compilerOptions: {
      outDir: output,
      module: moduleKind
    }
  })
  
  const ns: string[] = glob(`src/*`).map(dirpath => dirpath.replace(/^src\//, ''))
  
  ns.forEach(async str => {
    const indexPath: string = path.resolve(`src`, str, `index.ts`)
    const files: string[] = glob(`src/${str}/*.ts`).filter(filepath => !filepath.match(/test/))

    const indexContent: string = files.map(file => {
      const filename: string = path.basename(file, path.extname(file))
      const sourceFile: SourceFile = project.addExistingSourceFile(path.resolve(file))
      const exportedDeclarations = sourceFile.getExportedDeclarations()
      const acc: string[] = []
      exportedDeclarations.forEach((nodes, key) => {
        const name: string = `default` === key ? `default as ${filename}` : key
        const node = nodes[0]
        const leadingCommentRanges = node.getLeadingCommentRanges()
        if(0 === leadingCommentRanges.length) {
          acc.push(name)
          return 
        }

        const text = leadingCommentRanges[0].getText()
        if(/@noexport/.test(text)) return

        acc.push(name)
        return
      })

      project.removeSourceFile(sourceFile)
      
      return `export { ${acc.join(', ')} } from './${filename}'`
    }).join('\n')

    const sourceFile: SourceFile = project.createSourceFile(indexPath, indexContent)
    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      console.log(outputFile.getFilePath())
      console.log(outputFile.getWriteByteOrderMark())
      console.log(outputFile.getText())
      fs.writeFileSync(
        outputFile.getFilePath().replace(/\.js/g, extname),
        outputFile.getText(),
        `utf-8`
      )
    }

    console.log(`GENERATE ${str} INDEX:\n`, indexPath, indexContent)
  })


  const rootIndexPath: string = path.resolve(`src`, `index.ts`)
  const rootIndexContent: string = ns.map(str => `export * from './${str}'`).join('\n')
  const sourceFile: SourceFile = project.createSourceFile(rootIndexPath, rootIndexContent)
  console.log(`GENERATE ROOT INDEX:\n`, rootIndexPath, rootIndexContent)
  const emitOutput = sourceFile.getEmitOutput()
  for (const outputFile of emitOutput.getOutputFiles()) {
    console.log(outputFile.getFilePath())
    console.log(outputFile.getWriteByteOrderMark())
    console.log(outputFile.getText())
    fs.writeFileSync(
      outputFile.getFilePath().replace(/\.js/g, extname),
      outputFile.getText(),
      `utf-8`
    )
  }
}


task('test', async ctx => {
  await ctx.exec('jest')
})

task('test:watch', async ctx => {
  await ctx.exec('jest --watch')
})
