import { InHands } from "./inHands";
import { Deck } from "./deck";
import { Disp } from "./disp";
import { Card } from "./card";
import { Game } from "./game";
import { Wait } from "./wait";

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
   * ボタンにクリックアクションを付与する
   */
  export function initializeButton() {
    const reloadButton = getElement(ButtonId.RELOAD_BUTTON);
    const hitButton = getElement(ButtonId.HIT_BUTTON);
    const stayButton = getElement(ButtonId.STAY_BUTTON);

    reloadButton.onclick = finish;
    stayButton.onclick = stay;
    hitButton.onclick = hit;
  }

  /**
   * ゲームスタート時の初期処理
   */
  export function startGame() {
    // プレイヤーのカードを引く
    drawCardPlayer();
    drawCardPlayer();
    // ディーラーのカードを引く
    drawCardDeeler();
    drawCardDeeler(false);

    // 手札情報を表示する
    displayPlayer();
    displayDeeler();

    // プレイヤーのステータスを判定し後続処理に飛ばす
    checkPlayerStatus();
  }

  /**
   * プレイヤーの手札によって処理を分岐させる
   */
  function checkPlayerStatus() {
    const status = Game.MainLogic.judgeByCards(playerInHands);
    switch (status) {
      case Game.Status.JACK:
        deelerGame();
        break;
      case Game.Status.EXACT:
        deelerGame();
        break;
      case Game.Status.OVER:
        burstGame();
        break;
      case Game.Status.UNDER:
        waitPlayerChoice();
        break;
    }
  }

  /**
   * ディーラーのターン開始
   * TODO: 次の課題(#87)で実装する
   */
  function deelerGame() {
    // ヒットステイボタンを非表示にする
    Disp.hitStayButton(false);

    // カードを開く。
    openCardDeeler();

    // 17以上になるまで引く
    repeatDrawDeeler();
  }

  /**
   * ディーラーのカードを表にするメソッド
   */
  function openCardDeeler() {
    const cards = deelerInHands.getCards();
    cards.forEach((card) => {
      if (card.visible) {
        return;
      }
      card.visible = true;
    });
    displayDeeler();
  }

  /**
   * ディーラーが17以上になるまで引き続けるメソッド
   */
  async function repeatDrawDeeler() {
    const draw = Game.MainLogic.repeatDarwCard(deelerInHands);
    if (!draw) {
      return;
    }
    await waitTimeDeeler();
    drawCardDeeler();
    displayDeeler();
    repeatDrawDeeler();
  }

  /**
   * ディーラーの処理を待たせる（考え中）メソッド
   */
  async function waitTimeDeeler() {
    Disp.toggleThinkingmessage(true);
    await Wait.sec(3);
    Disp.toggleThinkingmessage(false);
  }

  /**
   * HIT_STAYボタン表示：プレイヤーの入力を待つ
   */
  function waitPlayerChoice() {
    Disp.hitStayButton(true);
  }

  /**
   * バーストでゲーム終了
   */
  function burstGame() {
    Disp.hitStayButton(false);
    Disp.reloadButton(true);
  }

  /**
   * 今の手札でプレイヤーのターンを終了する
   */
  function stay() {
    Disp.alertWrapp(playerInHands);
    deelerGame();
  }

  /**
   * ゲームを続ける（もう一枚引く）
   */
  function hit() {
    drawCardPlayer();
    displayPlayer();
    checkPlayerStatus();
  }

  /**
   * プレイヤーの手札を表示するメソッド
   */
  function displayPlayer() {
    Disp.cardPlayer(playerInHands);
    Disp.totalNumberPlayer(playerInHands);
    Disp.statusMessage(playerInHands);
  }

  /**
   * ディーラーの手札を表示するメソッド
   */
  function displayDeeler() {
    Disp.cardDeeler(deelerInHands);
    Disp.totalNumberDeeler(deelerInHands);
  }

  /**
   * プレイヤーがカードを手札に加えるメソッド
   * @param visible カードの裏表
   */
  function drawCardPlayer(visible: boolean = true) {
    const card = drawCard(visible);
    playerInHands.addCard(card);
  }

  /**
   * ディーラーがカードを手札に加えるメソッド
   * @param visible カードの裏表
   */
  function drawCardDeeler(visible: boolean = true) {
    const card = drawCard(visible);
    deelerInHands.addCard(card);
  }

  /**
   * デッキからカードを引くメソッド
   * @param visible カードの裏表（裏の時だけ渡す）
   * @return デッキから引いたカード１枚
   */
  function drawCard(visible: boolean): Card.elements {
    const card = deck.drawCard(visible);
    if (!card) {
      throw new Error("引けるカードがありません。");
    }
    return card;
  }

  /**
   * ゲームを終了するメソッド
   */
  function finish() {
    location.reload();
  }

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
}
