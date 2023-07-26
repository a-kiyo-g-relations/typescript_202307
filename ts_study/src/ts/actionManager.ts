import { InHands } from "./inHands";
import { Deck } from "./deck";
import { Disp } from "./disp";
import { Card } from "./card";

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
  const playerInHands = new InHands();
  /** ディーラーの手札をインスタンス化 */
  const deelerInHands = new InHands();

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
    drawCardPlayer();
    drawCardPlayer();
    drawCardDeeler();
    drawCardDeeler(false);
    displayCard();
    displayStatus();
  }

  /**
   * デッキからカードを引くメソッド
   * @param inHands 手札のインスタンス
   * @param visible カードの裏表（裏の時だけ渡す）
   */
  function drawCard(visible: boolean): Card.elements {
    const card = deck.drawCard(visible);
    if (!card) {
      throw new Error("引けるカードがありません。");
    }
    return card;
  }

  /**
   * プレイヤーがカードを手札に加えるメソッド
   * @param card デッキから引いたカード
   */
  function drawCardPlayer(visible: boolean = true) {
    const card = drawCard(visible);
    playerInHands.addCard(card);
  }

  /**
   * ディーラーがカードを手札に加えるメソッド
   * @param card デッキから引いたカード
   */
  function drawCardDeeler(visible: boolean = true) {
    const card = drawCard(visible);
    deelerInHands.addCard(card);
  }

  /**
   * 手札を表示し合計も表示するメソッド
   */
  function displayCard() {
    Disp.cardPlayer(playerInHands);
    Disp.cardDeeler(deelerInHands);
    Disp.totalNumberPlayer(playerInHands);
  }

  /**
   * ステータスメッセージとボタンを表示するメソッド
   */
  function displayStatus() {
    Disp.updateStatus(playerInHands);
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
    Disp.alertWrapp(playerInHands);
    finish();
  }

  /** ゲームを続ける（もう一枚引く） */
  function hit() {
    drawCardPlayer();
    displayCard();
    displayStatus();
  }

  /** ゲームを終了するメソッド */
  function finish() {
    location.reload();
  }
}
