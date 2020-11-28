const { promisify } = require('util')

const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const open = require('open')

const { clone } = require('./download')

const log = content => console.log(chalk.green(content))

const spawn = (...args) => {
  // 子进程的输出流和主进程的输出流对接
  const { spawn } = require('child_process')

  return new Promise(resolve => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)

    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {
  clear()
  const data = await figlet('biu biu biu !!!')
  log(data)
  log(`creating project: ${name}`)

  // clone
  await clone('github:su37josephxia/vue-template', name)

  //install
  log('installing dependencies')
  await spawn('npm', ['install'], { cwd: `./${name}` })
  log(chalk.green(`
    👌installation complete:
    ===========================
    To get Start:
    cd ${name}
    npm run serve
    =========================== 
  `))

  // open browser
  open('http://localhost:8080/')
  await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}
