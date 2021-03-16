import axios from 'axios'
import store from '../store'
import router from '../router'
import { allRoutes } from '@/router/index.js'
import { routerMatch } from '@/utils/menu.js'

/**
 * 获取菜单列表
 * 注意：由于菜单获取的是本地模拟的数据，所以线上菜单请求路径做了特殊处理，
 * 如果获取数据的是线上真实数据，需要将url改为线上真实Api地址，然后去除路径拼接即可。
 */
export function getMenuList() {
  let isLogin = false
  let{ href } = location
  let url = '/static/mock/menu.json'
  let sys = JSON.parse(localStorage.getItem("sys"))

  if(sys) {
    isLogin = sys.user.isLogin
  }

  if(!isLogin) {
    return
  }

  // 线上菜单请求路径拼接
  if(href.indexOf('localhost') === -1) {
    url = href.split('#')[0] + url
  }

  axios.get(url).then((res) => {
    if(res.data.code === 200) {
      let  { data } = res.data

      routerMatch(data, allRoutes).then(routes => {
        store.dispatch('menu/setMenuList', data)
        router.options.routes = Array.from(
          new Set(router.options.routes.concat(routes))
        )
        router.addRoutes(routes) // 动态添加路由
      })
    }
  })
}

