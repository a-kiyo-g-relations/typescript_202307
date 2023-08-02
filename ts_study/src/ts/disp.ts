import { Card } from "./card";
import { Game } from "./game";
import { InHands } from "./inHands";
/**
 * 表示に関する処理群
 */
export namespace Disp {
  /**
   * 表示する場所のID
   */
  namespace ElementId {
    /** 自分の手札 */
    export const CARD_PLAYER = "cardPlayer";
    /** ディーラーの手札 */
    export const CARD_DEELER = "cardDeeler";
    /** 自分の手札の合計 */
    export const TOTAL_NUMBER_PLAYER = "totalNumberPlayer";
    /** ディーラーの手札の合計 */
    export const TOTAL_NUMBER_DEELER = "totalNumberDeeler";
    /** ステータスメッセージ */
    export const STATUS_MESSAGE = "statusMessage";
    /** リロードボタン */
    export const RELOAD_BUTTON = "reloadButton";
    /** ヒットボタンとステイボタンの表示エリア */
    export const HIT_STAY_BUTTON = "buttonArea";
    /** ディーラーの考え中メッセージの表示場所 */
    export const THINKING_TIME_MESSAGE = "thinkingTimeMessage";
  }

  /**
   * エレメントを取得するメソッド
   * @param elementId 表示する場所のID
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
   * カード1枚分の表示用のHTMLエレメントを作る
   * @param card カード1枚のデータ
   * @returns HTMLエレメント
   */
  function createCardElement(card: Card.elements): HTMLDivElement {
    let createdDiv = document.createElement("div");
    createdDiv.className = "card";
    if (card.visible) {
      createdDiv.innerHTML =
        "<p>" + card.num + "</p>" + "<p>" + card.symbol + "</p>";
    } else {
      createdDiv.innerHTML = "<p>裏</p>";
    }
    return createdDiv;
  }

  /**
   * 自分の手札を表示するメソッド
   * @param inHands 手札のクラス
   */
  export function cardPlayer(inHands: InHands) {
    displayCards(ElementId.CARD_PLAYER, inHands);
  }

  /**
   * ディーラーの手札を表示するメソッド
   * @param inHands 手札のクラス
   */
  export function cardDeeler(inHands: InHands) {
    displayCards(ElementId.CARD_DEELER, inHands);
  }

  /**
   * 手札を表示するメソッド
   * @param elementId 表示する場所のエレメントID
   * @param inHands 手札のクラス
   */
  function displayCards(elementId: string, inHands: InHands) {
    const targetElement = getElement(elementId);
    targetElement.innerHTML = "";
    const cards = inHands.getCards();
    for (let i = 0; i < cards.length; i++) {
      const card = createCardElement(cards[i]);
      targetElement.appendChild(card);
    }
  }

  /**
   * 自分の手札の合計を表示するメソッド
   * @param inHands 手札のクラス
   */
  export function totalNumberPlayer(inHands: InHands) {
    displayTotalNumber(ElementId.TOTAL_NUMBER_PLAYER, inHands);
  }

  /**
   * ディーラーの手札の合計を表示するメソッド
   * @param inHands 手札のクラス
   */
  export function totalNumberDeeler(inHands: InHands) {
    displayTotalNumber(ElementId.TOTAL_NUMBER_DEELER, inHands);
  }

  /**
   * 合計を表示するメソッド
   * @param elementId 表示する場所のエレメントID
   * @param inHands 手札のクラス
   */
  function displayTotalNumber(elementId: string, inHands: InHands) {
    const targetElement = getElement(elementId);
    targetElement.textContent = inHands.culcNumber().toString();
  }

  /**
   * ステータスメッセージを表示する
   * @param inHands 手札クラス
   */
  export function statusMessage(inHands: InHands) {
    const status = Game.MainLogic.judgeByCards(inHands);
    switch (status) {
      case Game.Status.JACK:
        setStatusMessage(
          "ブラックジャックです。ディーラーにターンが移ります。"
        );
        break;
      case Game.Status.EXACT:
        setStatusMessage("21です。ディーラーにターンが移ります。");
        break;
      case Game.Status.OVER:
        setStatusMessage("バーストです。");
        break;
    }
  }

  /**
   * リロードボタンの表示非表示を切り替えるメソッド
   * @param visible 表示・非表示
   */
  export function reloadButton(visible: boolean) {
    toggleDisplayButtons(ElementId.RELOAD_BUTTON, visible);
  }

  /**
   * ヒットステイボタンの表示非表示を切り替えるメソッド
   * @param visible 表示・非表示
   */
  export function hitStayButton(visible: boolean) {
    toggleDisplayButtons(ElementId.HIT_STAY_BUTTON, visible);
  }

  /**
   * ボタンの表示/非表示を切り替えるメソッド
   * @param element ボタンのエレメントのID
   * @param visible 表示・非表示
   */
  function toggleDisplayButtons(element: string, visible: boolean) {
    const button = getElement(element);
    if (visible) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  /**
   * ステータスメッセージをセットするメソッド
   * @param message ステータスメッセージ
   */
  function setStatusMessage(message: string) {
    const messageElement = getElement(ElementId.STATUS_MESSAGE);
    messageElement.textContent = message;
  }

  /**
   * STAYでゲーム終了した際に出るアラート
   * @param inHands　手札クラス
   */
  export function alertWrapp(inHands: InHands) {
    alert(inHands.culcNumber() + "で終了する。");
  }

  /**
   * ディーラー考え中のメッセージ表示を切り替える
   * @param visible 表示するならtrue
   */
  export function toggleThinkingmessage(visible: boolean) {
    const messageElement = getElement(ElementId.THINKING_TIME_MESSAGE);
    if (visible) {
      messageElement.style.display = "block";
    } else {
      messageElement.style.display = "none";
    }
  }
}
