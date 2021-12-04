/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config.js
 * @Date: 2021-12-04 10:27:46
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-04 15:21:31
 * @Description:
 */
const head = require('./config/head.js')
const themeConfig = require('./config/themeConfig.js')
module.exports = {
  // theme: 'vdoing', // 使用npm包主题
  title: "菲 VuePress",
  description: "Just playing around",
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  head,
  themeConfig
};
