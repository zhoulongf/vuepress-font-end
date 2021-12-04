/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config/sidebar.js
 * @Date: 2021-12-04 10:50:14
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-04 16:49:49
 * @Description:
 */
module.exports = {
  // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)上面地址查找的是：docs>accumulate>JS>test.md 文件
  "/js基础/": [
    {
      title: "javascript文章",
      collapsable: false,
      children: [
       [ "new原理的实现",'new原理的实现'],
       [ "js1",'这是js']
      ],
    },
    {
      title: "前端2",
      collapsable: false,
      sidebarDepth: 2,
      children: [
        "/js基础/js2"
      ],
    },
  ],
  "/algorithm/": [
    {
      title: "算法1",
      collapsable: false,
      sidebarDepth: 2,
      children: ["/algorithm/01"],
    },
  ],
};
