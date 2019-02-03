const path = require('path')
const { task, desc, option, fs } = require('foy')

const OUTPUT_DIRECTORY = path.resolve('./dist')

task('clean', async ctx => {
  await fs.rmrf(OUTPUT_DIRECTORY)
})

task('build', ['clean'], async ctx => {
  await ctx.exec('tsc')
  await fs.copy(path.resolve(OUTPUT_DIRECTORY, 'src'), OUTPUT_DIRECTORY)
  await fs.rmrf(path.resolve(OUTPUT_DIRECTORY, 'src'))
  await fs.rmrf(path.resolve(OUTPUT_DIRECTORY, 'test'))
})

task('publish', 'build', async ctx => {
  await ctx.exec('npm version patch')
  await fs.copy('package.json', path.resolve(OUTPUT_DIRECTORY, 'package.json'))
  // await ctx.exec('npm publish')
})

