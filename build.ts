import * as path from 'path'
import * as fs from 'fs'
import { sync as glob } from 'glob'
import { Project, ts, printNode } from 'ts-morph'
import repack, { Target } from 'ts-repack'

const ignore = ['./node_modules/**', './test/**', './dist/**', './build.ts']
const files = glob('./**/*.ts', { ignore }).filter((filename: string) => {
  return ~['build.ts'].includes(filename) 
    && !filename.endsWith('.test.ts') 
    && !filename.startsWith('_')
}).map((filename: string) => filename.replace('.ts', ''))

const nameTable = analysisExport(files)

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
generateREADME()

function analysisExport(files: string[]) {
  const project = new Project({
    tsConfigFilePath: path.resolve('./tsconfig.json'),
    addFilesFromTsConfig: false
  })
  const nameTable: Map<string, { name: string, file: string, line: number, column: number }[]> = new Map
  const defaultExportFiles: Set<string> = new Set

  files.forEach(filePath => {
    const dirName = path.basename(path.dirname(filePath))
    const fileName = path.basename(filePath, path.extname(filePath))
    const sourceFile = project.addExistingSourceFile(filePath + '.ts')
    const exportedDeclarations = sourceFile.getExportedDeclarations()
    const exportNames: string[] = []

    exportedDeclarations.forEach((nodes, symbol) => {
      const node = nodes[0]
      const { line, column } = sourceFile.getLineAndColumnAtPos(node.getEnd())
      if('default' === symbol) {
        defaultExportFiles.add(
          `${dirName}/${fileName} has default export\n` + 
          `  @ ${filePath}.ts:${line}:${column}`
        )
      }
      
      if(!node) console.debug(nodes, fileName)
      const leadingCommentRanges = node.getLeadingCommentRanges()
      if(0 !== leadingCommentRanges.length) {
        const text = leadingCommentRanges[0].getText()
        if(/@noexport/.test(text)) return
      }

      const names = nameTable.get(symbol) || []
      nameTable.set(symbol, names.concat({ name: [dirName, fileName].join('/'), file: `${filePath}.ts`, line, column }))

      exportNames.push(symbol)
      return
    })
    project.removeSourceFile(sourceFile)
  })

  function collectNameConflict(): Set<string> {
    const errors: Set<string> = new Set
    for (const [name, files] of nameTable) {
      if(files.length <= 1) continue
      const out = []
      out.push(`"${name}" are both exports by ${files.map(({ name }) => name).join(', ')}`)
      files.forEach(({ file, line, column }) => {
        out.push(`  @ ${file}:${line}:${column}`)
      })
      errors.add(out.join('\n'))
    }
    return errors
  }

  if(defaultExportFiles.size) {
    const out = []
    out.push('[Warning]:\n')
    let index = 1
    defaultExportFiles.forEach(warning => {
      out.push(`${index}. ` + warning)
      index++
    })
    console.warn(out.join('\n'))
  }

  const errors = collectNameConflict()
  if(errors.size) {
    const out = []
    out.push('[Error]:\n')
    let index = 1
    errors.forEach(error => {
      out.push(`${index}. ` + error)
      index++
    })
    console.error(out.join('\n'))
    process.exit(2)
  }

  return nameTable
}

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
  
  const nodes = files.map(filename => {
    return ts.createExportDeclaration(
      undefined,
      undefined,
      undefined,
      ts.createStringLiteral(filename)
    )
  })
  const rootIndexPath: string = path.resolve('index.ts')
  const sourceFile = project.createSourceFile(rootIndexPath, nodes.map(node => printNode(node)).join('\n'))
  
  const emitOutput = sourceFile.getEmitOutput()
  for (const outputFile of emitOutput.getOutputFiles()) {
    fs.writeFileSync(
      outputFile.getFilePath().replace(/\.js/g, extname),
      outputFile.getText(),
      'utf-8'
    )
  }
}

function generateREADME(): void {
  const out: string[] = []
  nameTable.forEach((names, symbol) => {
    const { file, line } = names[0]
    out.push(`- [\`${symbol}\`](${file}#L${line})`)
  })
  fs.writeFileSync('README.md', out.join('\n'), 'utf-8')
}
