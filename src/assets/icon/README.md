### 介绍
目前可使用的图标库有两种
第一种是作者下载的iconfont库，里面集成了系统所需要的图标（可以用浏览器打开xxx.html查看图标标识）
第二种是Element库自带的图标库，https://element.eleme.cn/#/zh-CN/component/icon

### 如何使用自定义图标
从iconfont官网下载图标到本地（https://www.iconfont.cn/）
在/src/assets下创建一个iconfont文件夹
将下载的图标解压出来放到新创建的文件夹下面
然后在main.js中引入图标库 import "@/assets/iconfont/iconfont.css" 
最后复制图标标识放入标签即可
<i class='iconfont'>&#xe68a;</i>

### 优化
demo_index.html、demo.css文件是为了开发者查看而保留的，如果不需要查看，可删除。