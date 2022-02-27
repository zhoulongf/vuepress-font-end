/*
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/.vuepress/config/sidebar.js
 * @Date: 2021-12-04 10:50:14
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-02-27 15:09:26
 * @Description:
 */
module.exports = {
  // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)上面地址查找的是：docs>accumulate>JS>test.md 文件
  "/interview/":[
    { 
      title:"前端面试之道",
      collapsable: true,
      children: [
       [ 'javascript基础知识面试题','javascript基础知识面试题'],
       ['javascript进阶面试题','javascript进阶面试题']
      ]
    }
  ],
  '/vueAnalysis/':[
    {
      title: '介绍',
      collapsable: false,
      children: ['introduction/']
    },
    {
      title: '源码目录设计和架构设计',
      collapsable: false,
      children: ['design/']
    },
    {
      title: 'Rollup构建版本',
      collapsable: false,
      children: [
        'rollup/',
        'rollup/vue'
      ]
    },
    {
      title: '从入口到构造函数整体流程',
      collapsable: false,
      children: [
        'entry/',
        'entry/global',
        'entry/init',
        'entry/state',
        'entry/events',
        'entry/lifecycle',
        'entry/render'
      ]
    },
    {
      title: '响应式原理',
      collapsable: false,
      children: [
        'reactive/',
        'reactive/prepare',
        'reactive/props',
        'reactive/methods',
        'reactive/data',
        'reactive/computed',
        'reactive/watch',
        'reactive/reactive',
        'reactive/dep',
        'reactive/notify',
        'reactive/nexttick',
        'reactive/problem',
        'reactive/api'
      ]
    },
    {
      title: '虚拟DOM和VNode',
      collapsable: false,
      children: [
        'dom/',
        'dom/vnode',
        'dom/diff'
      ]
    },
    {
      title: '组件化',
      collapsable: false,
      children: [
        'component/',
        'component/mount',
        'component/render',
        'component/createElement',
        'component/createComponent',
        'component/merge',
        'component/patch',
        'component/lifecycle',
        'component/register'
      ]
    },
    {
      title: '编译原理',
      collapsable: false,
      children: [
        'compile/',
        'compile/compileToFunctions',
        'compile/parse',
        'compile/optimize',
        'compile/codegen'
      ]
    },
    {
      title: '扩展',
      collapsable: false,
      children: [
        'expand/',
        'expand/directive',
        'expand/filter',
        'expand/event',
        'expand/vmodel',
        'expand/slot',
        'expand/keep-alive',
        'expand/transition',
        'expand/transition-group',
        'expand/plugin'
      ]
    },
    {
      title: 'Vuex',
      collapsable: false,
      children: [
        'vuex/',
        'vuex/install',
        'vuex/init',
        'vuex/utils',
        'vuex/api'
      ]
    }
  ],
  '/vueNextAnalysis/':[
    {
      title: '介绍',
      collapsable: false,
      children: [
        'introduction/',
        'introduction/optimization.md'
      ]
    },
    {
      title: 'Monorepo和Rollup',
      collapsable: false,
      children: [
        'monorepo/',
        'rollup/'
      ]
    },
    {
      title: '源码目录',
      collapsable: false,
      children: ['catalog/']
    },
    {
      title: '响应式原理',
      collapsable: false,
      children: [
        'reactivity/',
        'reactivity/base',
        'reactivity/ref',
        'reactivity/reactive',
        'reactivity/computed',
        'reactivity/readonly'
      ]
    },
    {
      title: '组件化',
      collapsable: false,
      children: [
        'component/',
        'component/createApp',
        'component/setup',
        'component/mount',
        'component/lifecycle',
        'component/register',
        'component/render'
      ]
    }
  ],
  '/webpack/webpack/':[
    {
      title: 'Webpack',
      collapsable: false,
      children: [
        '/webpack/webpack/',
        '/webpack/webpack/source.md',
        '/webpack/webpack/install.md',
        '/webpack/webpack/start.md',
        '/webpack/webpack/static.md',
        '/webpack/webpack/core.md',
        '/webpack/webpack/advanced.md',
        '/webpack/webpack/case.md',
        '/webpack/webpack/optimization.md',
        '/webpack/webpack/loader.md',
        '/webpack/webpack/plugin.md'
      ]
    }
  ],
  '/library/':[
    {
      title: '脚手架工具',
      collapsable: false,
      children:[
        '/library/vue-library/',
        '/library/vant-library/'
      ]
    }
  ],
  '/design/':[
    {
      title: '前端设计模式',
      collapsable: true,
      children:[
        ['','设计模式']
      ]
    }
  ]
};
