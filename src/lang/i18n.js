import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  'cn': require('@/assets/lang/zh-cn'), // 中文语言包
  'en': require('@/assets/lang/en-us') // 英文语言包
}

export default new VueI18n({
  locale: 'cn', //  默认语言
  messages
})