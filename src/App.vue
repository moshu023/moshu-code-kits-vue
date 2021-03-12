<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'
  import { allRoutes } from '@/router/index.js'

  export default {
    name: 'App',
    created() {
      this.initState()
      this.getMenuList()
    },
    methods: {
      // 初始化State
      initState() {
        this.$store.dispatch('user/initState')
        this.$store.dispatch('worktab/initState')
        this.$store.dispatch('setting/initState')
      },
      // 获取菜单列表
      getMenuList() {
        let{ href } = location
        let url = '/static/mock/menu.json'

        if(href.indexOf('localhost') === -1) {
          url = '/' + href.split('/')[3] + url
        }

        axios.get(url).then((res) => {
          if(res.data.code === 200) {
            let  { data } = res.data

            this.routerMatch(data, allRoutes).then(routes => {
              this.$store.dispatch('menu/setMenuList', data)
              this.$router.options.routes = Array.from(
                new Set(this.$router.options.routes.concat(routes))
              )
              this.$router.addRoutes(routes) // 动态添加路由
            })
          }
        })
      },
      /**
       * 根据权限匹配路由并返回
       * @param {array} permission    后台返回的权限列表（菜单列表）
       * @param {array} allowRouters  需要权限的路由表（我这里因为要做多语言，所以用到了全部路由）
       */
      routerMatch(permission, allowRouters) {
        return new Promise((resolve) => {
          const routers = []
          function createRouter(permission) {
            permission.forEach((item) => {
              let { path, title, title_en } = item
              let pathArr = path && path.split('/')

              if(pathArr) {
                path = pathArr[pathArr.length-1]
              }

              if (item.children && item.children.length) {
                createRouter(item.children)
              }

              allowRouters.find((s) => {
                if(s.path == item.path) {
                  s.meta.title = item.title
                  s.meta.title_en = item.title_en
                }

                if (s.children) {
                  s.children.find((y) => {
                    let cPath = s.path + '/' + y.path

                    if (cPath === item.path) {
                      y.meta.permission = item.permission
                      y.meta.title = title
                      y.meta.title_en = title_en
                      routers.push(s)
                    }
                  })
                }else {
                  if (path && s.path === path) {
                    s.meta.permission = item.permission
                    y.meta.title = title
                    y.meta.title_en = title_en
                    routers.push(s);
                  }
                }
              })
            })
          }
          createRouter(permission)
          resolve(Array.from(new Set(routers)))
        })
      }
    }
  }
</script>