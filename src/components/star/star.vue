<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5
// 定义三种星星的状态
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    // 星星的尺寸类型
    starType () {
      return `star-${this.size}`
    },
    // 定义星星的状态，满格，半格，置灰等
    itemClasses () {
      let result = []
      // 传入的数值中大于0.5的变成.5即半格状态，下于.5的较少一颗星
      const score = Math.floor(this.score * 2) / 2
      const hasDecimal = score % 1 !== 0
      const integer = Math.floor(score)

      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON) // 像数组中推入满星的个数
      }
      if (hasDecimal) {
        result.push(CLS_HALF) // 推入半星
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF) // 不足5个推入置灰的状态
      }

      return result
    }
  }

}

</script>
<style lang='stylus' scoped>
  @import "~common/stylus/mixin.styl"

  .star
    display flex
    align-items center
    justify-content center
    .star-item
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
