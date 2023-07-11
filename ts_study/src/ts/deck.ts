// Cardクラスのインポート
import { CardElement, SymbolMark } from "./card";

export class Deck {
  /**カード1枚のデータ
   * @type { CardElement }
   */
  private card: CardElement;
  /**デッキ1組
   * @type { CardElement[] }
   */
  private cardMembers: CardElement[];

  constructor() {
    this.makeDeck();
  }

  /**デッキを作るメソッド
   * @type { void }
   */
  makeDeck() {
    // マーク4種類分のループ(i)、1~13の数字のループ(j)
    for (let i = 0; i < 4; i++) {
      for (let j: number = 1; j <= 13; j++) {
        // 各マークに1~13の数字を割り当てる
        switch (i) {
          case 0:
            this.card = { num: j, symbol: SymbolMark.SPADE };
            break;
          case 1:
            this.card = { num: j, symbol: SymbolMark.HEART };
            break;
          case 2:
            this.card = { num: j, symbol: SymbolMark.CLOVER };
            break;
          case 3:
            this.card = { num: j, symbol: SymbolMark.DIAMOND };
            break;
          default:
            break;
        }
        // デッキを定義する配列にプッシュする
        this.cardMembers.push(this.card);
      }
    }
  }

  /**デッキ1組のデータを返すメソッド
   * @returns { CardElement[] }
   */
  getCardMembers() {
    return this.cardMembers;
  }
}
