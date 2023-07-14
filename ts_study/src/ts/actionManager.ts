import { InHands } from "./inHands";
import { Deck } from "./deck";
import { Disp } from "./disp";

export namespace ActionManager {
  /** 表示されたボタンのID */
  namespace ButtonId {
    /** ヒットボタン */
    export const HIT_BUTTON = "hitButton";
    /** ステイボタン */
    export const STAY_BUTTON = "stayButton";
    /** リロードボタン */
    export const RELOAD_BUTTON = "reloadButton";
  }

  /** デッキのクラスをインスタンス化 */
  const deck = new Deck();
  /** 手札のクラスをインスタンス化 */
  const inHands = new InHands();

  /**
   * エレメントを取得するメソッド
   * @param elementId 押されたボタンのID
   * @returns 取得したエレメント
   */
  function getElement(elementId: string): HTMLElement {
    const element = document.getElementById(elementId);
    if (element === null) {
      throw new Error("指定されたIDのタグが見つかりません。");
    }
    return element;
  }

  /**
   * ゲームスタート時の初期処理
   */
  export function startGame() {
    drawCard();
    drawCard();
    displayCard();
    displayStatus();
  }

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
   * 手札を表示し合計も表示するメソッド
   */
  function displayCard() {
    Disp.cardInHands(inHands);
    Disp.totalNum(inHands);
  }

  /**
   * ステータスメッセージとボタンを表示するメソッド
   */
  function displayStatus() {
    Disp.updateStatus(inHands);
  }

  /**
   * 押されたボタンによる処理の分岐
   */
  export function initializeButton() {
    const reloadButton = getElement(ButtonId.RELOAD_BUTTON);
    const hitButton = getElement(ButtonId.HIT_BUTTON);
    const stayButton = getElement(ButtonId.STAY_BUTTON);

    reloadButton.onclick = reload;
    stayButton.onclick = stay;
    hitButton.onclick = hit;
  }

  /** ページリロード（ゲームリセット） */
  function reload() {
    location.reload();
  }

  /** 今の手札で終了しリロードする */
  function stay() {
    alert(inHands.culcNumber() + "で終了です。");
    location.reload();
  }

  /** ゲームを続ける（もう一枚引く） */
  function hit() {
    continueGame();
  }

  /**
   * ゲームを続ける（ヒットボタンを押す）時に呼ばれるメソッド
   */
  function continueGame() {
    drawCard();
    displayCard();
    displayStatus();
  }
}
