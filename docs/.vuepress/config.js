/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config.js
 * @Date: 2021-12-04 10:27:46
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-02-24 14:22:47
 * @Description:
 */
const head = require('./config/head.js')
const themeConfig = require('./config/themeConfig.js')
const configureWebpack = require('./config/configureWebpack.js')
module.exports = {
  base:"/vuepress-font-end/",
  title: "菲戈-技术文档",
  description: "菲戈-技术文档",
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  head,
  port: 3300,
  markdown: {
    lineNumbers: false
  },
  themeConfig,
  configureWebpack
};
