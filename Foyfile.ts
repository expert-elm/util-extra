import path from 'path'
import { task, fs } from 'foy'

const OUTPUT_DIRECTORY: string = path.resolve('./dist')

task('clean', async () => {
  await fs.rmrf(OUTPUT_DIRECTORY)
})

task('build', ['clean'], async ctx => {
  await ctx.exec('tsc -p ./tsconfig.build.json')
  await fs.copy(path.resolve(OUTPUT_DIRECTORY, 'src'), OUTPUT_DIRECTORY)
  await fs.rmrf(path.resolve(OUTPUT_DIRECTORY, 'src'))
})

task('test', ['clean'], async ctx => {
  await ctx.exec('jest')
})
task('test:watch', ['clean'], async ctx => {
  await ctx.exec('jest --watch')
})

task('publish', ['build'], async ctx => {
  await ctx.exec('npm version patch')
  await fs.copy('package.json', path.resolve(OUTPUT_DIRECTORY, 'package.json'))
  await ctx.cd(OUTPUT_DIRECTORY).exec('npm publish')
})
