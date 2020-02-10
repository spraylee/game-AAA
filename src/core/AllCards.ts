import { Card, cardTypeList, cardValueList } from './Card'
import { CardGroup } from './CardGroup'

export class AllCards {
  list: Card[]
  /**
   * 生成一副完整的扑克牌，52张，不包含大小王
   */
  constructor() {
    const list: Card[] = []
    cardTypeList.map(cardType => {
      cardValueList.map(cardValue => {
        list.push(new Card(cardType, cardValue))
      })
    })
    this.list = list
  }
  /**
   * 从牌组里随机临时选择出3张，返回组成的牌组（此三张不会从牌堆里取出）
   */
  getATempCardGroup() {
    const result: number[] = []
    while (result.length < 3) {
      const num = Math.floor(Math.random() * 52)
      if (!result.includes(num)) {
        result.push(num)
      }
    }
    const threeCard = result.map(i => this.list[i]) as [Card, Card, Card]
    return new CardGroup(...threeCard)
  }
}
