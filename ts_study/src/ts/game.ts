import { InHands } from "./inHands";
// 結果に関する名前空間
export namespace Result {
  export enum Status {
    UNDER,
    JACK,
    EXACT,
    OVER,
  }
}

// 判定に関するクラス
export class Game {
  /**
   * ゲームのターン数を数える変数（処理フローの中で更新される）
   */
  static order = 0;
  /**
   * ゲーム結果の判別用に21を定義
   */
  static BLACK_JACK = 21;
  /**
   * 手札の合計値からプレイヤーのステータスを判定するメソッド
   * @param totalNum 手札の合計値
   * @param blackJack ナチュラルブラックジャックかの判定
   * @returns 手札のステータスを返す/同時にリザルトメッセージもセットする
   */
  static judgeByCards(InHands: InHands): Result.Status {
    if (InHands.blackJack()) {
      return Result.Status.JACK;
    } else if (InHands.culcNumber() === this.BLACK_JACK) {
      return Result.Status.EXACT;
    } else if (InHands.culcNumber() > this.BLACK_JACK) {
      return Result.Status.OVER;
    }
    return Result.Status.UNDER;
  }
}
