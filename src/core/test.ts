import { CardGroup } from './CardGroup'
import { Card } from './Card'
import { AllCards } from './AllCards'

const cardGroup0 = new CardGroup(
  new Card('black', 'A'),
  new Card('red', 'A'),
  new Card('square', 'Q'),
)

const allCards = new AllCards()

const loops = 100 * 10000
let bigCount = 0

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
