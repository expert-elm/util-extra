import * as path from 'path'
import * as fs from 'fs'
import glob from 'glob'
import { Project, ts, printNode } from 'ts-morph'

const ignore = ['./node_modules/**', './test/**', './lib/**', './build.ts']
const files = glob.sync('./**/*.ts', { ignore }).filter((filename: string) => {
  return ~['build.ts'].includes(filename) 
    && !filename.endsWith('.test.ts') 
    && !filename.startsWith('_')
}).map((filename: string) => filename.replace('.ts', ''))

const nameTable = analysisExport(files)

const OUTPUT_DIRECTORY: string = path.resolve('lib')

fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true })

build()
generateIndex(ts.ModuleKind.ESNext, OUTPUT_DIRECTORY, `.js`)
generateREADME()

function build() {
  const project = new Project({
    tsConfigFilePath: path.resolve('./tsconfig.json'),
    addFilesFromTsConfig: false
  })

  files.forEach(filePath => {
    // const dirName = path.basename(path.dirname(filePath))
    // const fileName = path.basename(filePath, path.extname(filePath))
    // const sourceFile = project.addExistingSourceFile(filePath + '.ts')
    project.addExistingSourceFile(filePath + '.ts')
  })

  project.emit({
    customTransformers: {
      after: [ transformer() ]
    }
  })
}

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

    console.log(filePath)
    exportedDeclarations.forEach((nodes, symbol) => {
      const node = nodes[0]
      const { line, column } = sourceFile.getLineAndColumnAtPos(node.getStart())
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
      ts.createStringLiteral(filename + '.js')
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
  let out: string = `\
<br/>

<div align=left>

# util-extra

_name enough_

</div>

<br />
`
  const groups: { [key: string]: string[] } = {}
  nameTable.forEach((names, symbol) => {
    const { file, line } = names[0]
    if(!groups[file]) groups[file] = []
    groups[file].push(`- [\`${symbol}\`](${file}#L${line})`)
    // out.push(`- [\`${symbol}\`](${file}#L${line})`)
  })
  Object.keys(groups).forEach(file => {
    const name = file.replace('./', '').replace('.ts', '')
    out += '<details>\n'
    out += `<summary>${name}</summary>\n\n`
    groups[file].forEach(row => {
      out += `${row}\n`
    })
    out += '</details>\n\n'
  })
  fs.writeFileSync('README.md', out, 'utf-8')
}



function transformer(): ts.TransformerFactory<ts.SourceFile> {
  return (transformationContext: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitNode(node: ts.Node): ts.VisitResult<ts.Node> {
        if (shouldMutateModuleSpecifier(node)) {
          if (ts.isImportDeclaration(node)) {
            const newModuleSpecifier = ts.createLiteral(`${node.moduleSpecifier.text}.js`)
            return ts.updateImportDeclaration(node, node.decorators, node.modifiers, node.importClause, newModuleSpecifier)
          } else if (ts.isExportDeclaration(node)) {
            const newModuleSpecifier = ts.createLiteral(`${node.moduleSpecifier.text}.js`)
            return ts.updateExportDeclaration(node, node.decorators, node.modifiers, node.exportClause, newModuleSpecifier, node.isTypeOnly)
          }
        }

        return ts.visitEachChild(node, visitNode, transformationContext)
      }

      function shouldMutateModuleSpecifier(node: ts.Node): node is (ts.ImportDeclaration | ts.ExportDeclaration) & { moduleSpecifier: ts.StringLiteral } {
        if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) return false
        if (node.moduleSpecifier === undefined) return false
        // only when module specifier is valid
        if (!ts.isStringLiteral(node.moduleSpecifier)) return false
        // only when path is relative
        if (!node.moduleSpecifier.text.startsWith('./') && !node.moduleSpecifier.text.startsWith('../')) return false
        // only when module specifier has no extension
        if (path.extname(node.moduleSpecifier.text) !== '') return false
        return true
      }

      return ts.visitNode(sourceFile, visitNode)
    }
  }
}
