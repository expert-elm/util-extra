import path from 'path'
import { sync as glob } from 'glob'
import { task, fs } from 'foy'
import * as ts from 'typescript'
// import transform from 'ts-creator'

const OUTPUT_DIRECTORY: string = path.resolve('./dist')

task('clean', async () => {
  await fs.rmrf(OUTPUT_DIRECTORY)
})

task('build', ['clean'], async ctx => {
  await ctx.exec('tsc')
  const DENO_DIRECTORY = path.resolve(OUTPUT_DIRECTORY, 'deno')
  await fs.mkdir(DENO_DIRECTORY)
  await fs.copy(path.resolve('./src'), DENO_DIRECTORY)
  glob(path.resolve(DENO_DIRECTORY, '**', '*.ts')).forEach(async p => {
    if(p.match(/test/)) {
      await fs.rmrf(p)
    } else {
      console.log(p)
      const source = fs.readFileSync(p, 'utf-8')
      const resultFile = ts.createSourceFile(
        p,
        source,
        ts.ScriptTarget.Latest,
        /*setParentNodes*/ false,
        ts.ScriptKind.TS
      )
      const printer = ts.createPrinter()
      const transformed = ts.transform(resultFile, [ transformer() ], {
        module: ts.ModuleKind.ESNext
      }).transformed
      
      const result = printer.printNode(
        ts.EmitHint.Unspecified,
        transformed[0],
        resultFile
      )

      fs.writeFileSync(p, result, 'utf-8')
    }
  })
  // glob(path.resolve(DENO_DIRECTORY, '**', '*.ts')).forEach(async p => {
    // const content = fs.readFileSync(p, 'utf-8')
    
    
  // })
  await fs.copy(path.resolve(OUTPUT_DIRECTORY, 'src'), OUTPUT_DIRECTORY)
  await fs.rmrf(path.resolve(OUTPUT_DIRECTORY, 'src'))

  function transformer<T extends ts.Node>(): ts.TransformerFactory<T> {
    return (context) => {
      const visitor: ts.Visitor = node => {      
        if(ts.isSourceFile(node)) return ts.visitEachChild(node, visitor, context)      
  
        if(ts.isImportDeclaration(node)) {
          return ts.visitEachChild(node, (node) => {
            if(!ts.isStringLiteral(node)) return node
            console.log(node)
            return ts.createStringLiteral(node.text.replace(/[\'\"]/g, '') + '.ts')
          }, context)
        }
        
        return node
      }
      return (node) => ts.visitNode(node, visitor)
    }
  }
})

task('test', ['clean'], async ctx => {
  await ctx.exec('jest')
})

task('publish', ['build'], async ctx => {
  await ctx.exec('npm version patch')
  await fs.copy('package.json', path.resolve(OUTPUT_DIRECTORY, 'package.json'))
  await ctx.cd(OUTPUT_DIRECTORY).exec('npm publish')
})
