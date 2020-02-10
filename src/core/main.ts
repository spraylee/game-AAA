import { CardGroup } from './CardGroup'
import { Card } from './Card'
import { AllCards } from './AllCards'

/**
 * 生成一个待比较的牌组
 */
const cardGroup0 = new CardGroup(
  new Card('black', '2'),
  new Card('black', '3'),
  new Card('black', '5'),
)

const allCards = new AllCards()

/**
 * 循环次数
 */
const loops = 100 * 10000
let bigCount = 0

/**
 * 循环计算
 */
for (let i = 0; i < loops; i++) {
  let tempCardGroup = allCards.getATempCardGroup()
  // console.log(tempCardGroup)
  if (cardGroup0.isBiggerThanCardGroup(tempCardGroup)) {
    // console.log('bigger')
    bigCount++
  }
}

console.log(cardGroup0)
console.log(
  `Loop for ${loops} times, bigger for ${bigCount} times, ratio: ${(
    (bigCount * 100) /
    loops
  ).toFixed(2)} %`,
)
