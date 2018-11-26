<template>
  <div class="tab">
    <cube-tab-bar class="border-bottom-1px" v-model="selectedLabel" :show-slider="true" :data="tabs" :use-transition="false" ref="tabBar"></cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide :loop="false" :auto-play="false" :show-dots="false" :options="slideOptions" :initial-index="index" ref="slide" @change="onChange" @scroll="onScroll">
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data"></component>
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
  methods: {
    onChange (current) {
      this.index = current
    },
    // 滚动事件
    onScroll (pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = (-pos.x / slideWidth) * tabBarWidth // 横向滚动的距离

      this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  components: {
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