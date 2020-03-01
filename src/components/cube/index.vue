<template>
  <div class="cube auto-rotate">
    <div
      class="surface"
      :style="getStyle(i)"
      :class="`surface-${i}`"
      v-for="i in 6"
      :key="i"
    >
      <!-- {{ i }} -->
    </div>
    <!-- <div class="surface surface-2">2</div>
    <div class="surface surface-3">3</div>
    <div class="surface surface-4">4</div>
    <div class="surface surface-5">5</div>
    <div class="surface surface-6">6</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    size: { type: Number, default: 100 },
  },
  setup(props) {
    const transformConfig: Record<number, string> = {
      1: `translateZ(${props.size / 2}px)`,
      2: `translateZ(${-props.size / 2}px)`,
      3: `translateX(${props.size / 2}px) rotateY(90deg)`,
      4: `translateX(${-props.size / 2}px) rotateY(90deg)`,
      5: `translateY(${props.size / 2}px) rotateX(90deg)`,
      6: `translateY(${-props.size / 2}px) rotateX(90deg)`,
    }
    const getStyle = (i: number) => ({
      width: `${props.size}px`,
      height: `${props.size}px`,
      left: `-${props.size / 2}px`,
      top: `-${props.size / 2}px`,
      transform: transformConfig[i],
      fontSize: `${props.size / 2}px`,
    })
    return { getStyle }
  },
})
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate3d(1, 0.5, -1, 0deg);
  }
  to {
    transform: rotate3d(1, 0.5, -1, 360deg);
  }
}

.cube {
  display: block;
  position: fixed;
  // left: 50vw;
  // top: 50vh;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  // border: 10px solid red;
  &.auto-rotate {
    animation: rotate 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .surface {
    position: absolute;
    // left: -100px;
    // top: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    // width: 200px;
    // height: 200px;
    box-sizing: border-box;
    border: 1px solid #333;
    color: black;
    background-color: #ccc;
    opacity: 0.9;
  }
  .surface-1 {
    transform: translateZ(100px);
    background-color: red;
  }
  .surface-2 {
    transform: translateZ(-100px);
    background-color: yellow;
  }
  .surface-3 {
    transform: translateX(100px) rotateY(90deg);
    background-color: blue;
  }
  .surface-4 {
    transform: translateX(-100px) rotateY(90deg);
    background-color: green;
  }
  .surface-5 {
    transform: translateY(-100px) rotateX(90deg);
    background-color: #888;
  }
  .surface-6 {
    transform: translateY(100px) rotateX(90deg);
    background-color: white;
  }
}
</style>
