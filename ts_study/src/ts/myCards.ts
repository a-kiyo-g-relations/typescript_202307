import { Card } from "./card";
export class MyCards {
  /**
   * 手札を定義する変数
   */
  private myCards: Card.elements[] = [];
  /**
   * デッキからカードを引いた回数
   */
  private gameOder: number = 0;

  /**
   * 手札を作るメソッド
   * @param card デッキから引いたカード1枚のデータ
   */
  makeMyCards(card: Card.elements) {
    if (card !== undefined) {
      this.myCards.push(card);
      this.gameOder++;
    } else {
      // デッキが0枚の時の処理
    }
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
  culcMyCardsNum(): number {
    // ハイスコア（カードの最大値）を定義
    const highScore = 10;
    // 処理分岐の条件aceと、その数を定義
    const ace = 1;
    let howManyAce = 0;
    // 合計値を定義
    let total = 0;
    // 手札1枚ずつの判定
    this.myCards.forEach((card) => {
      // 1の場合はaceの数が増える
      if (card.num === ace) {
        howManyAce++;
        // 11以上の場合ハイスコアが足される
      } else if (card.num > highScore) {
        total += highScore;
      } else {
        total += card.num;
      }
    });
    // 合計と1の枚数が11未満なら、1の枚数に10を足す（11と判断されるaceの数は1枚以上にはならないから）
    if (total + howManyAce < 11) {
      total += howManyAce + highScore;
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
    let bj = true;
    // aceを定義（手札にaceがないとブラックジャックではない）
    let ace = 1;
    // 手札1枚ずつの判定
    this.myCards.forEach((card) => {
      if (card.num !== ace) {
        bj = false;
      }
    });
    return bj;
  }
}
