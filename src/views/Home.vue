<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="form">
      <el-cascader v-model="cards.first" :options="options.first"></el-cascader>
      <el-cascader
        v-model="cards.second"
        :options="options.second"
      ></el-cascader>
      <el-cascader v-model="cards.third" :options="options.third"></el-cascader>
      <el-button
        @click="submit"
        :disabled="!cards.first || !cards.second || !cards.third || isLoading"
        :loading="isLoading"
        >计算获胜概率</el-button
      >
    </div>
    <div class="result">
      <div class="count" v-if="ratio !== null">
        {{ (ratio * 100).toFixed(2) }}
      </div>
      <div class="unit" v-if="ratio !== null">%</div>
    </div>
    <cube class="cube" :size="30"></cube>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import cube from '../components/cube/index.vue'
import { defineComponent, ref, onMounted, Ref } from '@vue/composition-api'
import { cardTypeList, cardValueList, CardType, CardValue } from '../core/Card'
import { countCardGroupBiggerRatio } from '../core/main'
import { useLoading } from '@/use/loading'
import { sleep } from '@/utils/sleep'

interface optionValueType {
  label: string
  value: string
  children?: optionValueType[]
}
interface optionsType {
  first: optionValueType[]
  second: optionValueType[]
  third: optionValueType[]
}

export default defineComponent({
  name: 'home',
  components: {
    HelloWorld,
    cube,
  },
  setup(props) {
    const cards = ref({
      first: null as null | [CardType, CardValue],
      second: null as null | [CardType, CardValue],
      third: null as null | [CardType, CardValue],
    })

    const { isLoading, withLoading } = useLoading()

    let ratio: Ref<number | null> = ref(null)

    const typeLabelMap: Record<CardType, string> = {
      red: '红桃',
      black: '黑桃',
      square: '方块',
      flower: '梅花',
    }

    const createOptions = () => {
      options.value = cardTypeList.reduce(
        (all, cur) => {
          Object.keys(all).forEach(key => {
            all[key as keyof typeof all].push({
              value: cur,
              label: typeLabelMap[cur],
              children: cardValueList.map(i => ({ label: i, value: i })),
            })
          })
          return all
        },
        { first: [], second: [], third: [] } as optionsType,
      )
    }
    onMounted(() => {
      createOptions()
    })
    const options: Ref<optionsType> = ref({ first: [], second: [], third: [] })
    const submit = async () => {
      ratio.value = await withLoading(
        new Promise(async resolve => {
          await sleep(10)
          if (!cards.value.first) return
          if (!cards.value.second) return
          if (!cards.value.third) return
          resolve(
            countCardGroupBiggerRatio(
              [
                { type: cards.value.first[0], value: cards.value.first[1] },
                { type: cards.value.second[0], value: cards.value.second[1] },
                { type: cards.value.third[0], value: cards.value.third[1] },
              ],
              10 * 1000,
            ),
          )
        }),
      )
    }
    return { cards, options, submit, ratio, isLoading }
  },
})
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .cube {
    position: absolute;
    right: 50px;
    top: 50px;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 200px;
    // margin-right: 30px;
    .el-cascader {
      margin-bottom: 10px;
    }
  }
  .result {
    margin-top: 50px;
    display: flex;
    align-items: flex-end;
    .count {
      font-size: 80px;
    }
    .unit {
      padding-bottom: 12px;
    }
  }
}
</style>
