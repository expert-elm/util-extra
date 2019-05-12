import path from 'path'
import { sync as glob } from 'glob'
import { task, fs } from 'foy'
import * as ts from 'typescript'

const OUTPUT_DIRECTORY: string = path.resolve('./dist')

task('clean', async () => {
  if(fs.existsSync(OUTPUT_DIRECTORY)) await fs.rmrf(OUTPUT_DIRECTORY)
  await fs.mkdir(OUTPUT_DIRECTORY)
})

task('build', ['clean', `build:dist`, `build:deno`], async _ctx => {
  
})

task(`build:dist`, async ctx => {
  await ctx.exec('tsc -p ./tsconfig.build.json')
  await fs.copy(path.resolve(OUTPUT_DIRECTORY, 'src'), OUTPUT_DIRECTORY)
  await fs.rmrf(path.resolve(OUTPUT_DIRECTORY, 'src'))
})

task('build:deno', async _ctx => {
  const DENO_DIRECTORY: string = path.resolve(OUTPUT_DIRECTORY, 'deno')
  await fs.mkdir(DENO_DIRECTORY)
  await fs.copy(path.resolve('./src'), DENO_DIRECTORY)
  
  glob(path.resolve(DENO_DIRECTORY, '**', '*.ts')).forEach(async p => {
    if(p.match(/test/)) {
      await fs.rmrf(p)
    } else {
      const source = fs.readFileSync(p, 'utf-8')
      const resultFile = ts.createSourceFile(
        p,
        source,
        ts.ScriptTarget.Latest,
        /*setParentNodes*/ false,
        ts.ScriptKind.TS
      )
      const printer = ts.createPrinter()
      const transformed = ts.transform(resultFile, [ transformer(Extension.TS) ], {
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
})

task(`build:browser`, async _ctx => {
  
})

task('test', async ctx => {
  await ctx.exec('jest')
})

task('test:watch', async ctx => {
  await ctx.exec('jest --watch')
})

task('release', async ctx => {
  await ctx.exec('npm version patch')
  await fs.copy('package.json', path.resolve(OUTPUT_DIRECTORY, 'package.json'))
  await ctx.cd(OUTPUT_DIRECTORY).exec('npm publish')
})

enum Extension {
  TS = '.ts',
  JS = '.js'
}

function transformer<T extends ts.Node>(ext: Extension): ts.TransformerFactory<T> {
  return (context) => {
    const visitor: ts.Visitor = node => {      
      if(ts.isSourceFile(node)) return ts.visitEachChild(node, visitor, context)      

      if(ts.isImportDeclaration(node)) {
        return ts.visitEachChild(node, (node) => {
          if(!ts.isStringLiteral(node)) return node
          console.log(node)
          return ts.createStringLiteral(node.text.replace(/[\'\"]/g, '') + ext)
        }, context)
      }
      
      return node
    }
    return (node) => ts.visitNode(node, visitor)
  }
}
