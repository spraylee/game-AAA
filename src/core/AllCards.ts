import { Card, cardTypeList, cardValueList } from './Card'
import { CardGroup } from './CardGroup'

export class AllCards {
  list: Card[]
  constructor() {
    const list: Card[] = []
    cardTypeList.map(cardType => {
      cardValueList.map(cardValue => {
        list.push(new Card(cardType, cardValue))
      })
    })
    this.list = list
  }
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
