const fs = require('fs')
const chalk = require('chalk')
const handlebars = require('handlebars')

module.exports = async () => {
  // 获取页面列表
  const list = fs.readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').toLowerCase(),
      file: v
    }))

  function compile(metadata, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString()
      const result = handlebars.compile(content)(metadata)
      fs.writeFileSync(filePath, result)
      console.log(chalk.green(`🚀${filePath} 创建成功`));
    }
  }

  // 生成路由定义
  compile({ list }, './src/router.js', './template/router.js.hbs')

  // 生成路由定义
  compile({ list }, './src/App.vue', './template/App.vue.hbs')
}