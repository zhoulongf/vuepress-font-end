#!/usr/bin/env sh
###
 # @Author: zhoulf
 # @FilePath: /vuepress-font-end/deploy.sh
 # @Date: 2021-12-04 17:15:34
 # @LastEditors: zhoulf
 # @LastEditTime: 2022-02-24 15:39:03
 # @Description: 
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'depoly脚本更新'
# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
# https://zhoulongf.github.io/vuepress-font-end
git push -f https://github.com/zhoulongf/vuepress-font-end.git master:gh-pages

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
