import * as path from 'path'
import * as fs from 'fs'
import { sync as glob } from 'glob'
import { Project, ts, printNode } from 'ts-morph'
import repack, { Target } from 'ts-repack'

const OUTPUT_DIRECTORY: string = path.resolve('dist')
const OUTPUT_MJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, 'module')
const OUTPUT_CJS_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, 'cjs')

fs.mkdirSync(OUTPUT_DIRECTORY)
fs.mkdirSync(OUTPUT_CJS_DIRECTORY)
fs.mkdirSync(OUTPUT_MJS_DIRECTORY)
repack(Target.CJS, { output: OUTPUT_CJS_DIRECTORY })
repack(Target.MJS, { output: OUTPUT_MJS_DIRECTORY })
generateIndex(ts.ModuleKind.CommonJS, OUTPUT_CJS_DIRECTORY, `.js`)
generateIndex(ts.ModuleKind.ESNext, OUTPUT_MJS_DIRECTORY, `.mjs`)

function generateIndex(moduleKind: ts.ModuleKind, output: string, extname: string) {
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
    fs.writeFileSync(
      outputFile.getFilePath().replace(/\.js/g, extname),
      outputFile.getText(),
      `utf-8`
    )
  }
}
