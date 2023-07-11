// Cardクラスのインポート
import { Card } from "./card";

export class Deck {
  /**
   * デッキ1組の変数を定義
   */
  private cardMembers: Card.elements[];

  constructor() {
    this.cardMembers = this.makeDeck();
  }

  /**
   * デッキを作るメソッド
   * @return 作成したデッキのデータ
   */
  makeDeck() {
    // マークの配列を取得
    const symbolArray: Card.SymbolMark[] = Card.SYMBOL_MARKS;
    // カードの配列を定義
    const cardArray: Card.elements[] = [];
    // マークそれぞれに対し1~13の数字のカードを作成し、配列に入れる
    symbolArray.forEach((symbol) => {
      for (let i = Card.MIN_NUMBER; i <= Card.MAX_NUMBER; i++) {
        const card = { num: i, symbol: symbol };
        cardArray.push(card);
      }
    });
    const shffledDeck = this.shuffleDeck(cardArray);
    return shffledDeck;
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
   * @return シャッフルしたカードの配列（デッキ）
   */
  shuffleDeck(cardArray: Card.elements[]): Card.elements[] {
    cardArray.sort((a, b) => 0.5 - Math.random());
    return cardArray;
  }
}
