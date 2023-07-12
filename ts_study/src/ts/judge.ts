import { Card } from "./card";
// 結果に関する名前空間
namespace Result {
  /**
   * 手札のステータスを定義
   */
  export enum Status {
    OVER,
    UNDER,
    EXACT,
  }
  /**
   * 終了時のメッセージを定義
   */
  export let message: string;
}

// 判定に関するクラス
export class Judge {
  /**
   * @param myCards
   * @returns 手札の合計値を返す
   */
  static culcMyCardsNum(myCards: Card.elements[]): number {
    // 合計とaceの数の変数を用意
    let total = 0;
    let howManyAce = 0;
    // 手札1枚ずつの判定
    myCards.forEach((card) => {
      // card.numがreadonlyなため、変数を用意
      let cardNumber: number;
      // Aかつ、Aの登場回数が1回目だった時
      if (card.num === 1 && howManyAce === 0) {
        cardNumber = 11;
        howManyAce += 1;
        // Aを11にしたことでバーストした場合
        if (total + cardNumber > 21) {
          cardNumber = 1;
        }
        // 絵札の処理
      } else if (card.num > 10) {
        cardNumber = 10;
      } else {
        cardNumber = card.num;
      }
      total += cardNumber;
    });
    return total;
  }
  /**
   * @param myCards
   * @returns ナチュラルブラックジャックを判定するboolean
   */
  static blackJack(myCards: Card.elements[]): boolean {
    // aceとjackの初期値はfalse
    let ace = false;
    let jack = false;
    // 手札1枚ずつの判定
    myCards.forEach((card) => {
      if (card.num === 1) {
        ace = true;
      } else if (card.num > 10) {
        jack = true;
      }
    });
    if (ace && jack) {
      return true;
    }
    return false;
  }
  /**
   * @param totalNum
   * @param blackJack
   * @returns 手札のステータスを返す
   * 同時にリザルトメッセージもセットする
   */
  static gameByTotalNum(totalNum: number, blackJack: boolean): Result.Status {
    if (totalNum === 21 && blackJack) {
      Result.message = "ナチュラルブラックジャックです。";
      return Result.Status.EXACT;
    } else if (totalNum === 21) {
      Result.message = "21です。ブラックジャックです。";
      return Result.Status.EXACT;
    } else if (totalNum > 21) {
      Result.message = "バーストです。";
      return Result.Status.OVER;
    } else {
      Result.message = totalNum + "で終了です。";
      return Result.Status.UNDER;
    }
  }
}
