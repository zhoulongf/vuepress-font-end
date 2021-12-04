/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config/themeConfig.js
 * @Date: 2021-12-04 10:47:12
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-04 15:35:39
 * @Description:
 */
const nav = require("./nav.js");
const sidebar = require('./sidebar.js')
module.exports = {
  nav,
  sidebarDepth: 2,
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  lastUpdated: "上次更新", // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
  docsDir: "docs", // 编辑的文件夹
  editLinks: true, // 启用编辑
  editLinkText: "编辑",

  sidebar
};
