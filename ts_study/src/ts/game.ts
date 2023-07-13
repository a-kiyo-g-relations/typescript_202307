import { MyCards } from "./myCards";
// 結果に関する名前空間
namespace Result {
  export enum Status {
    UNDER,
    JACK,
    EXACT = 21,
    OVER,
  }
}

// 判定に関するクラス
export class Game extends MyCards {
  /**
   * 手札の合計値からプレイヤーのステータスを判定するメソッド
   * @param totalNum 手札の合計値
   * @param blackJack ナチュラルブラックジャックかの判定
   * @returns 手札のステータスを返す/同時にリザルトメッセージもセットする
   */
  judgeByMyCards(): Result.Status {
    if (this.blackJack()) {
      return Result.Status.JACK;
    } else if (this.culcMyCardsNum() === Result.Status.EXACT) {
      return Result.Status.EXACT;
    } else if (this.culcMyCardsNum() > Result.Status.EXACT) {
      return Result.Status.OVER;
    }
    return Result.Status.UNDER;
  }
}
