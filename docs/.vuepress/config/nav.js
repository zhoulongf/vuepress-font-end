/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config/nav.js
 * @Date: 2021-12-04 10:39:06
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-04 16:49:21
 * @Description:
 */
module.exports = [
  { text: "首页", link: "/" }, // 内部链接 以docs为根目录
  {
    text: "前端",
    link:"/js基础/",
    items: [
      { text: "javascript", link: "/js基础/new原理的实现/" },
      {
        text: "算法仓库",
        link: "/algorithm/",
      },
    ],
  },
];
