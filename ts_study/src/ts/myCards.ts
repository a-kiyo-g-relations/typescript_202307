import { Card } from "./card";
export class MyCards {
  /**
   * 手札を定義する変数
   */
  private myCards: Card.elements[] = [];
  /**
   * エースを定義する
   */
  private ACE: number = 1;
  /**
   * ハイカード（10以上）を定義する
   */
  private HIGH_CARD: number = 10;
  /**
   * 手札を作るメソッド
   * @param card デッキから引いたカード1枚のデータ
   */
  addCard(card: Card.elements) {
    this.myCards.push(card);
  }
  /**
   * 現在の手札を返すメソッド
   */
  getMyCards(): Card.elements[] {
    return this.myCards;
  }
  /**
   * 手札のカードの合計を出すメソッド
   * @param myCards 手札の配列
   * @returns 手札の合計値を返す
   */
  culcNumber(): number {
    let howManyAce = 0;
    // 合計値を定義
    let total = 0;
    // 手札1枚ずつの判定
    this.myCards.forEach((card) => {
      if (card.num === this.ACE) {
        howManyAce++;
      } else if (card.num > this.HIGH_CARD) {
        total += this.HIGH_CARD;
      } else {
        total += card.num;
      }
    });
    // 合計と1の枚数が11未満なら、1の枚数に10を足す（11と判断されるaceの数は1枚以上にはならないから）
    if (total + howManyAce <= 11) {
      total += howManyAce + this.HIGH_CARD; //HIGH_CARD === 10
    } else {
      total += howManyAce;
    }
    return total;
  }
  /**
   * @param myCards 手札
   * @returns ナチュラルブラックジャックを判定するboolean
   */
  blackJack(): boolean {
    // エースとハイカードの有無をbooleanで定義
    let ace = false;
    let jack = false;
    // 手札1枚ずつの判定
    this.myCards.forEach((card) => {
      if (card.num === this.ACE) {
        ace = true;
      } else if (card.num >= this.HIGH_CARD) {
        jack = true;
      }
    });
    if (ace && jack) {
      return true;
    }
    return false;
  }
}
