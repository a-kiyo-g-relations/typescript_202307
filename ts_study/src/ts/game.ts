import { InHands } from "./inHands";
// 結果に関する名前空間
export namespace Game {
  export enum Status {
    UNDER,
    JACK,
    EXACT,
    OVER,
  }
  // 判定に関するクラス
  export class MainLogic {
    /**
     * ゲームのターン数を数える変数（処理フローの中で更新される）
     */
    static turnOrder = 0;
    /**
     * ゲーム結果の判別用に21を定義
     */
    static BLACK_JACK_NUMBER = 21;
    /**
     * ディーラーがカードを引くかどうかの判定数字
     */
    static REPEAT_DRAW_NUMBER = 17;

    /**
     * 手札の合計値からプレイヤーのステータスを判定するメソッド
     * @param inHands 手札のクラス
     * @returns 手札のステータスを返す
     */
    static judgeByCards(inHands: InHands): Game.Status {
      if (inHands.isBlackJack()) {
        return Game.Status.JACK;
      } else if (inHands.culcNumber() === this.BLACK_JACK_NUMBER) {
        return Game.Status.EXACT;
      } else if (inHands.culcNumber() > this.BLACK_JACK_NUMBER) {
        return Game.Status.OVER;
      }
      return Game.Status.UNDER;
    }

    /**
     * ディーラーがカードを引くかを判断するメソッド
     * @param inHands 手札のインスタンス
     * @returns カードを引く場合はtrue
     */
    static repeatDarwDeelerCard(inHands: InHands): boolean {
      if (inHands.culcNumber() < this.REPEAT_DRAW_NUMBER) {
        return true;
      }
      return false;
    }
  }
}
