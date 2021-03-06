<template>
  <div class="task console">
    <console-card/>

    <div class="row row1">
      <histogram/>
      <plan-progress/>
    </div>

    <div class="row row2">
      <line-chart/>
      
      <round-progress 
        color="#6EB2F4" 
        iconBg="#CAE2FA" 
        title="代办事项" 
        title2="本月待办事项：20" 
        styles="flex: 1"
      />
      <pie-chart/>
    </div>
  </div>
</template>

<script>
  import Histogram from "@/components/dashboard/Histogram"
  import RoundProgress from "@/components/dashboard/RoundProgress"
  import PlanProgress from "@/components/dashboard/PlanProgress"
  import PieChart from "@/components/dashboard/PieChart"
  import ConsoleCard from "@/components/dashboard/ConsoleCard"
  import LineChart from "@/components/dashboard/LineChart"

  export default {
    components: { 
      RoundProgress,
      PlanProgress,
      Histogram,
      PieChart,
      ConsoleCard,
      LineChart
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .console {
    height: 100%;

    &::-webkit-scrollbar {
      width: 0px !important;
    }

    >>> .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;
      padding: 10px 0;
      border-bottom: 1px solid #F0F0F0;
      position: relative;
      z-index: 999;

      .line-title {
        padding: 0 13px;
        display: flex;
        align-items: center;

        i {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 50%;
          color: #1890FF;
          background-color: rgb(230, 247, 255);
          font-size: 15px;
        }

        span {
          color: #555;
          font-size: 15px;
          margin-left: 10px;
        }
      }
    }

    .row {
      display: flex;
      margin-top: 15px;
      background: transparent !important;

      > div {
        margin-right: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 3px;
        transition: box-shadow .3s;

        &:last-of-type {
          margin-right: 0 !important;
        }
      }
    }

    .row1, .row2 {
      height: 380px;
    }
  }

  @media only screen and (max-width: $device-notebook)  {
    .console {
      .row1{
        height: 350px;
      }

      .row2 {
        height: 300px;
      }
    }
  }

  @media only screen and (max-width: $device-ipad) { 
    .console {

      .row {
        display: block;
        height: auto !important;
      }

      .row1 {
        margin-top: 0;
      }
    }
  }
</style>
