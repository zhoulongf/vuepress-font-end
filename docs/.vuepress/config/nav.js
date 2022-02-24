/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config/nav.js
 * @Date: 2021-12-04 10:39:06
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-02-24 15:24:43
 * @Description:
 */
module.exports = [
  { text:"前端面试之道",link: "/interview/javascript基础知识面试题/"},
  {
    text: "前端书籍",
    items: [
      {
        text: '你不知道的JavaScript(上)',
        link: '/books/javascript/know-up'
      },
      {
        text: '你不知道的JavaScript(中下)',
        link: '/books/javascript/know-down'
      },
      {
        text: 'JavaScript数据结构和算法',
        link: '/books/javascript/algorithm'
      },
      {
        text: 'JavaScript设计模式与开发实践',
        link: '/designPattern/'
      },
      {
        text: '深入理解ES6',
        link: '/books/javascript/es6'
      }
    ]
  },
  {
    text: 'Vue源码分析',
    items: [
      { text: 'Vue2.0源码分析', link: '/vueAnalysis/introduction/' },
      { text: 'Vue3.0源码分析', link: '/vueNextAnalysis/introduction/' }
    ]
  },
  {
    text: '打包工具',
    items: [
      {
        text: 'Webpack',
        link: '/webpack/webpack/'
      },
      {
        text: 'Rollup',
        link: '/rollup/'
      },
      {
        text: 'Gulp',
        link: '/Gulp/'
      }
    ]
  },
];
