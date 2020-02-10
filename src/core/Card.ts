/**
 * 花色
 * red: 红桃 black: 黑桃 flower: 梅花 square: 方块
 */
export type CardType = 'red' | 'black' | 'square' | 'flower'

export const cardTypeList: CardType[] = ['red', 'black', 'square', 'flower']

/**
 * 牌面数值
 */
export type CardValue =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A'

export const cardValueList: CardValue[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
]

export class Card {
  /**
   * 花色
   * red: 红桃 black: 黑桃 square: 方块 flower: 梅花
   */
  type: CardType
  /**
   * 牌面数值
   */
  value: CardValue
  /**
   * 通过花色的数字生成一张牌
   * @param type 花色
   * @param value 数字
   */
  constructor(type: CardType, value: CardValue) {
    this.type = type
    this.value = value
  }
  /**
   * 是否比后面的牌数值大
   * @param target 待比较的牌
   */
  isValueBigThan(target: Card) {
    return this.getValueNumber() > target.getValueNumber()
  }
  /**
   * 是否有一样的数值大小
   * @param target 待比较的牌
   */
  isValueEqualTo(target: Card) {
    return this.value === target.value
  }
  /**
   * 是否是一样的花色
   * @param target 待比较的牌
   */
  isTypeEqualTo(target: Card) {
    return this.type === target.type
  }
  /**
   * 是否比待比较的牌花色更靠前（红黑梅方）
   * @param target 待比较的牌
   */
  isTypeBigThan(target: Card) {
    const map: { [key in CardType]: number } = {
      red: 4,
      black: 3,
      flower: 2,
      square: 1,
    }
    return map[this.type] > map[target.type]
  }
  /**
   * 待比较的牌时候是当前牌的下一张（顺子）
   * @param target 待比较的牌
   */
  couldTheNextCardBe(target: Card) {
    return this.getValueNumber() === 14
      ? target.getValueNumber() === 2
      : target.getValueNumber() === this.getValueNumber() + 1
  }
  /**
   * 待比较的牌时候是当前牌的上一张（顺子）
   * @param target 待比较的牌
   */
  couldTheLastCardBe(target: Card) {
    return this.getValueNumber() === 2
      ? target.getValueNumber() === 14
      : target.getValueNumber() === this.getValueNumber() - 1
  }
  /**
   * 获取对应牌的数字权重，5: 5, 10: 10, J：11, Q: 12, K: 13, A: 14
   */
  getValueNumber() {
    const map = { J: 11, Q: 12, K: 13, A: 14 }
    if (['J', 'Q', 'K', 'A'].includes(this.value)) {
      return map[this.value as keyof typeof map]
    } else {
      return +this.value
    }
  }
}
