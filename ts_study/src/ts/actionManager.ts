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

  /** プレイヤーの手札をインスタンス化 */
  const player = new InHands();
  /** ディーラーの手札をインスタンス化 */
  const deeler = new InHands();

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
    drawCard(player);
    drawCard(player);
    drawCard(deeler);
    drawCard(deeler, false);
    displayCard();
    displayStatus();
  }

  /**
   * デッキからカードを引く（手札に加える）メソッド
   * @param inHands 手札のインスタンス
   * @param visible カードの裏表（裏の時だけ渡す）
   */
  function drawCard(inHands: InHands, visible?: boolean) {
    const card = deck.drawCard();
    if (!card) {
      throw new Error("カードが引けない");
    }
    inHands.addCard(card, visible);
  }

  /**
   * 手札を表示し合計も表示するメソッド
   */
  function displayCard() {
    Disp.cardPlayer(player);
    Disp.cardDeeler(deeler);
    Disp.totalNumberPlayer(player);
  }

  /**
   * ステータスメッセージとボタンを表示するメソッド
   */
  function displayStatus() {
    Disp.updateStatus(player);
  }

  /**
   * ボタンにクリックアクションを付与する
   */
  export function initializeButton() {
    const reloadButton = getElement(ButtonId.RELOAD_BUTTON);
    const hitButton = getElement(ButtonId.HIT_BUTTON);
    const stayButton = getElement(ButtonId.STAY_BUTTON);

    reloadButton.onclick = finishGame;
    stayButton.onclick = stay;
    hitButton.onclick = hit;
  }

  /** ゲーム終了 */
  function finishGame() {
    finish();
  }

  /** 今の手札で終了する */
  function stay() {
    Disp.alertWrapp(player);
    finish();
  }

  /** ゲームを続ける（もう一枚引く） */
  function hit() {
    drawCard(player);
    displayCard();
    displayStatus();
  }

  /** ゲームを終了するメソッド */
  function finish() {
    location.reload();
  }
}
