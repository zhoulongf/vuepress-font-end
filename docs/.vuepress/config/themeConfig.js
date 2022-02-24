/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config/themeConfig.js
 * @Date: 2021-12-04 10:47:12
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-02-24 11:59:52
 * @Description:
 */
const nav = require("./nav.js");
const sidebar = require('./sidebar.js')
module.exports = {
  lastUpdated: '最后更新时间',
  logo:"/three-ball.jpeg",
  repo: 'https://github.com/zhoulongf/vuepress-font-end',
  repoLabel: 'Github',
  nav,
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  lastUpdated: "上次更新", // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
  docsDir: "docs", // 编辑的文件夹
  editLinks: false, // 启用编辑
  editLinkText: "编辑",
  sidebar
};
