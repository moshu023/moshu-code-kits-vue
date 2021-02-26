<template>
  <div class="notice" :style="{height: show ? '450px' :'0', opacity: show ? 1 : 0}">
    <ul class="bar">
      <li v-for="(item, index) in barList" :key="index" :class="{'active': barActiveIndex === index}"
        @click="changeBar(index)"
      >
        {{item}}
      </li>
    </ul>
    <div class="content">
      <vue-scroll :ops="ops" ref="scroll">
        <ul v-show="barActiveIndex === 0">
          <li v-for="(item, index) in noticeList" :key="index">
            <h4>{{item.title}}</h4>
            <p>{{item.time}}</p>
          </li>
        </ul>
      </vue-scroll>
    </div>

    <div class="load" @click="loadMore">
      <i :style="{opacity: isLoading ? 1 : 0}" class="el-icon-loading"></i>
      <span>加载更多</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        barList: ['通知', '消息', '代办'],
        barActiveIndex: 0,
        ops: {          // 滚动条
          rail: {
            opacity: '0',
            background: undefined,
            size: '0px'
          },
          bar: {
            background: '#999',
            keepShow: false,
            size: '0px',
            minSize: 0
          },
          scrollButton: {
            enable: true,
            background: '#cecece'
          },
          scrollPanel: {
            easing: 'easeOutQuad',
            speed: 800
          },
          vuescroll: {
            wheelScrollDuration: 600,
            wheelDirectionReverse: true
          }
        },
        noticeList: [
          {
            title: '新增通知中心',
            time: '2021-2-26 23:50'
          },{
            title: '移动端自适应',
            time: '2021-2-21 8:05'
          },{
            title: '登录、API管理接入接口',
            time: '2020-1-17 21:12'
          },{
            title: '新增使用文档',
            time: '2021-01-14 0:20'
          },
          {
            title: '新增暗黑主题模式',
            time: '2020-12-20 0:15'
          },{
            title: '菜单mock本地真实数据',
            time: '2020-12-17 22:06'
          }
        ],
        isLoading: false
      };
    },
    methods: {
      closeNotice() {
        this.$emit('closeNotice')
      },
      changeBar(index) {
        this.barActiveIndex = index
      },
      loadMore() {
        this.isLoading = true

        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .notice {
    width: 320px;
    height: 450px;
    background: #fff;
    position: absolute;
    top: 67px;
    right: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    border-radius: 4px;
    transition: height .3s, opacity .3s;
    overflow: hidden;

    .bar {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #DCDEE2;
      padding: 0 20px;
      box-sizing: border-box;
      
      li {
        height: 38px;
        flex: 1;
        text-align: center;
        color: #515a6e;
        font-size: 14px;
        cursor: pointer;
        transition: color .3s;
        margin-right: 20px;

        &:last-of-type {
          margin-right: 0;
        }
        
        &:hover {
          color: #2d8cf0;
        }

        &.active {
          color: #2d8cf0;
          border-bottom: 2px solid #2d8cf0;
        }
      }
    }

    .content {
      width: 100%;
      height: calc(100% - 80px);
      
      ul {
        li {
          padding: 15px 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #E8EAEC;

          &:last-of-type{
            border-bottom: 0;
          }

          h4 {
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            color: #515a6e;
          }

          p {
            font-size: 12px;
            color: #808695;
          }
        }
      }
    }

    .load {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-top: 1px solid #E8EAEC;
      cursor: pointer;
      color: #808695;
      font-size: 14px;
      transition: color .3s;
      @include userSelect;

      &:hover {
        color: #2d8cf0;
      }
    }
  }
</style>
