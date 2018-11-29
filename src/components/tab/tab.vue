<template>
  <div class="tab">
    <cube-tab-bar class="border-bottom-1px" v-model="selectedLabel" :show-slider="true" :data="tabs" :use-transition="false" ref="tabBar"></cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide :loop="false" :auto-play="false" :show-dots="false" :options="slideOptions" :initial-index="index" ref="slide" @change="onChange" @scroll="onScroll">
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      index: this.initialIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0 // 避免出现斜着滚动的情况
      }
    }
  },
  computed: {
    selectedLabel: {
      get () {
        return this.tabs[this.index].label
      },
      set (newVal) {
        this.index = this.tabs.findIndex(value => {
          return value.label === newVal
        })
      }
    }
  },
  mounted () {
    // 解决首次渲染时没有数据的问题
    this.onChange(this.index)
  },
  methods: {
    onChange (current) {
      this.index = current
      // 根据切换的tab页来调用组件上的方法从而获取相应的数据
      const component = this.$refs.component[current]
      if (component && component.fetch) {
        component.fetch()
      }
    },
    // 滚动事件
    onScroll (pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = (-pos.x / slideWidth) * tabBarWidth // 横向滚动的距离

      this.$refs.tabBar.setSliderTransform(transform)
    }
  }

}

</script>
<style lang='stylus' scoped>
  @import "~common/stylus/variable"

  .tab
    display flex
    flex-direction column
    height 100%
    >>> .cube-tab
      padding 10px 0
    .slide-wrapper
      flex 1
      overflow hidden
</style>
