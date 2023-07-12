import { Card } from "./card";
/**
 * カードを先頭から引く（切り取る）クラス
 */
export class DrawAction {
  /**
   * @param cardMembers
   * @returns デッキの先頭1枚
   */
  static drawCardFromDeck(cardMembers: Card.elements[]) {
    return cardMembers.shift();
  }
}
