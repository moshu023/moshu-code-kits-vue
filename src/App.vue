<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {getMenuList} from '@/api/menuApi.js'

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
      getMenuList()
    }
  }
}
</script>
