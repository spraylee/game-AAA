import { Card } from './Card'

export class CardGroup {
  list: [Card, Card, Card]
  level: number
  levelValue: number
  /**
   * 使用三张牌，组成牌组，默认排序，从大到小，红黑梅方
   * @param card0 第一张牌
   * @param card1 第二张牌
   * @param card2 第三张牌
   */
  constructor(card0: Card, card1: Card, card2: Card) {
    this.list = this.sortOrder([card0, card1, card2])
    const { level, levelValue } = this.countCardGroupLevelAndLevelValue()
    this.level = level
    this.levelValue = levelValue
  }
  /**
   * 排序(A,K,Q,J,10,..2)(红黑梅方)
   */
  sortOrder(list: [Card, Card, Card]) {
    return list.sort((a, b) => {
      if (a.isValueEqualTo(b)) {
        return a.isValueBigThan(b) ? 1 : -1
      } else {
        return a.isValueBigThan(b) ? -1 : 1
      }
    })
  }
  /**
   * 计算牌组等级，以及在该等级中的大小值（相同等级时，levelValue才有比较价值）
   */
  countCardGroupLevelAndLevelValue(): { level: number; levelValue: number } {
    if (this.isAllSameValue()) {
      return { level: 6, levelValue: this.list[0].getValueNumber() }
    } else if (this.isAllSameType() && this.isProgression()) {
      // TODO: A32, AKQ 问题
      return {
        level: 5,
        levelValue:
          this.list[0].getValueNumber() * 10000 +
          this.list[1].getValueNumber() * 100 +
          this.list[2].getValueNumber(),
      }
    } else if (this.isAllSameType()) {
      return {
        level: 4,
        levelValue:
          this.list[0].getValueNumber() * 10000 +
          this.list[1].getValueNumber() * 100 +
          this.list[2].getValueNumber(),
      }
    } else if (this.isProgression()) {
      // TODO: A32, AKQ 问题
      return {
        level: 3,
        levelValue: this.list[0].getValueNumber(),
      }
    }
    const doubleCount = this.getDoubleValue()
    if (doubleCount) {
      const { doubleValue, secondValue } = doubleCount
      return { level: 2, levelValue: doubleValue * 100 + secondValue }
    } else if (this.isSpecial()) {
      return { level: 0, levelValue: 0 }
    } else {
      return {
        level: 1,
        levelValue:
          this.list[0].getValueNumber() * 10000 +
          this.list[1].getValueNumber() * 100 +
          this.list[2].getValueNumber(),
      }
    }
  }
  /**
   * 是否是滚筒，例如：AAA
   */
  isAllSameValue() {
    return (
      this.list[0].isValueEqualTo(this.list[1]) &&
      this.list[0].isValueEqualTo(this.list[2])
    )
  }
  /**
   * 是否为金花儿
   */
  isAllSameType() {
    return (
      this.list[0].isTypeEqualTo(this.list[1]) &&
      this.list[0].isTypeEqualTo(this.list[2])
    )
  }
  /**
   * 判断是否为顺子（目前A32不认为是顺子）
   */
  isProgression() {
    return (
      this.list[0].couldTheLastCardBe(this.list[1]) &&
      this.list[1].couldTheLastCardBe(this.list[2])
    )
  }
  /**
   * 是否为对子（滚筒算然也是对子，但是会优先判断为滚筒）
   */
  getDoubleValue() {
    if (this.list[0].value === this.list[1].value) {
      return {
        doubleValue: this.list[0].getValueNumber(),
        secondValue: this.list[2].getValueNumber(),
      }
    } else if (this.list[2].value === this.list[1].value) {
      return {
        doubleValue: this.list[1].getValueNumber(),
        secondValue: this.list[0].getValueNumber(),
      }
    } else if (this.list[2].value === this.list[0].value) {
      return {
        doubleValue: this.list[2].getValueNumber(),
        secondValue: this.list[1].getValueNumber(),
      }
    }
  }
  /**
   * 是否为特殊牌（不是金花儿的235）
   */
  isSpecial() {
    return (
      !this.isAllSameType() &&
      this.list[0].value === '5' &&
      this.list[1].value === '3' &&
      this.list[2].value === '2'
    )
  }
  /**
   * 是否比待比较的牌组大
   * @param target 待比较的牌组
   */
  isBiggerThanCardGroup(target: CardGroup) {
    if (this.level === 6 && target.level === 0) {
      return false
    }
    if (this.level === 0 && target.level === 6) {
      return true
    }
    if (this.level > target.level) {
      return true
    }
    if (this.level < target.level) {
      return false
    }
    if (this.level === target.level) {
      return this.levelValue > target.levelValue
    }
  }
  /**
   * 是否和待比较的牌组一样大
   * @param target 待比较的牌组
   */
  isCardGroupEqualTo(target: CardGroup) {
    return this.level === target.level && this.levelValue === target.levelValue
  }
}
