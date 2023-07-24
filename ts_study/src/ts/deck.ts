// Cardクラスのインポート
import { Card } from "./card";

export class Deck {
  /**
   * デッキ1組の変数を定義
   */
  private cardMembers: Card.elements[];

  constructor() {
    this.cardMembers = this.makeDeck();
    this.shuffle();
  }

  /**
   * デッキを作るメソッド
   * @return 作成したデッキのデータ
   */
  makeDeck(): Card.elements[] {
    // カードの配列を定義
    const cardArray: Card.elements[] = [];
    // マークそれぞれに対し1~13の数字のカードを作成し、配列に入れる
    Card.SYMBOL_MARKS.forEach((symbol) => {
      for (let i = Card.MIN_NUMBER; i <= Card.MAX_NUMBER; i++) {
        const card = { num: i, symbol: symbol, viside: false };
        cardArray.push(card);
      }
    });
    return cardArray;
  }
  /**
   * デッキ1組のデータを返すメソッド
   * @returns デッキ1組のデータを返す
   */
  getCardMembers(): Card.elements[] {
    return this.cardMembers;
  }
  /**
   * デッキをシャッフルするメソッド
   */
  private shuffle() {
    this.cardMembers = this.cardMembers.sort((a, b) => 0.5 - Math.random());
  }
  /**
   * デッキからカードを1枚引く（配列の先頭を切り取る）メソッド
   * @returns デッキの先頭の1枚
   */
  drawCard(): Card.elements | undefined {
    return this.cardMembers.shift();
  }
}
