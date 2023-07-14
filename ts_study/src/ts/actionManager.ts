import { InHands } from "./inHands";
import { Deck } from "./deck";
import { Disp } from "./disp";

export namespace ActionManager {
  /** デッキのクラスをインスタンス化 */
  const deck = new Deck();
  /** 手札のクラスをインスタンス化 */
  const inHands = new InHands();

  /**
   * デッキからカードを引く（手札に加える）メソッド
   */
  function drawCard() {
    const card = deck.drawCard();
    if (!card) {
      throw new Error("カードが引けない");
    }
    inHands.addCard(card);
  }

  /**
   * ゲームスタート時の初期処理
   */
  export function startGame() {
    drawCard();
    drawCard();
    displayCard();
  }

  /**
   * 手札を表示し合計も表示するメソッド
   */
  function displayCard() {
    Disp.cardInHands(inHands);
    Disp.totalNum(inHands);
  }
}
