import * as path from 'path'
import { sync as glob } from 'glob'
import { task, fs } from 'foy'
import { Project, ts, printNode } from 'ts-morph'
import repack, { Target } from 'ts-repack'
import log from 'log-extra'

const OUTPUT_DIRECTORY: string = path.resolve('dist')
const OUTPUT_MJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, 'module')
const OUTPUT_CJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, 'cjs')


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
  
  const nodes = glob('src/**/*.ts')
    .filter(filename => !filename.endsWith('.test.ts'))
    .map(filename => filename.replace('src', '.').replace('.ts', ''))
    .map(filename => {
      return ts.createExportDeclaration(
        undefined,
        undefined,
        undefined,
        ts.createStringLiteral(filename)
      )
    })
  const rootIndexPath: string = path.resolve(`src`, `index.ts`)
  const sourceFile = project.createSourceFile(rootIndexPath, nodes.map(node => printNode(node)).join('\n'))
  
  const emitOutput = sourceFile.getEmitOutput()
  for (const outputFile of emitOutput.getOutputFiles()) {
    log.debug(`gen`, `index.root.emit.file`, outputFile.getFilePath())
    log.debug(`gen`, `index.root.emit.content`, outputFile.getFilePath())
    fs.writeFileSync(
      outputFile.getFilePath().replace(/\.js/g, extname),
      outputFile.getText(),
      `utf-8`
    )
  }
}
