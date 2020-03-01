import { CardGroup } from './CardGroup'
import { Card, CardType, CardValue } from './Card'
import { AllCards } from './AllCards'

/**
 * 生成一个待比较的牌组
 */
// const cardGroup0 = new CardGroup(
//   new Card('black', 'K'),
//   new Card('flower', '10'),
//   new Card('black', '2'),
// )

const allCards = new AllCards()

// console.log(
//   `Loop for ${loops} times, bigger for ${bigCount} times, ratio: ${(
//     (bigCount * 100) /
//     loops
//   ).toFixed(2)} %`,
// )

/**
 *
 * @param list 待比较的三张牌
 * @param loops 循环计算次数，默认 100 0000
 */
export const countCardGroupBiggerRatio = (
  list: [
    { type: CardType; value: CardValue },
    { type: CardType; value: CardValue },
    { type: CardType; value: CardValue },
  ],
  loops = 100 * 10000,
) => {
  let bigCount = 0
  const cardGroup = new CardGroup(
    new Card(list[0].type, list[0].value),
    new Card(list[1].type, list[1].value),
    new Card(list[2].type, list[2].value),
  )

  /**
   * 循环计算
   */
  for (let i = 0; i < loops; i++) {
    let tempCardGroup = allCards.getATempCardGroup()
    // console.log(tempCardGroup)
    if (cardGroup.isBiggerThanCardGroup(tempCardGroup)) {
      // console.log('bigger')
      bigCount++
    }
  }
  return bigCount / loops
}
