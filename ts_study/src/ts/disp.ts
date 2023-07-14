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
    /** 手札 */
    export const CARD_IN_HANDS = "cardInHands";
    /** 手札の合計 */
    export const TOTAL_NUMBER = "totalNumber";
    /** ステータスメッセージ */
    export const STATUS_MESSAGE = "statusMessage";
    /** リロードボタン */
    export const RELOAD_BUTTON = "reloadButton";
    /** ヒットボタンとステイボタンの表示エリア */
    export const BUTTON_AREA = "buttonArea";
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
    createdDiv.innerHTML =
      "<p>" + card.num + "</p>" + "<p>" + card.symbol + "</p>";
    return createdDiv;
  }

  /**
   * 手札を表示するメソッド
   * @param id index.htmlから取得した手札を表示するブロックのID
   * @param cards 手札の配列
   */
  export function cardInHands(inHands: InHands) {
    const targetElement = getElement(ElementId.CARD_IN_HANDS);
    targetElement.innerHTML = "";
    const cards = inHands.getCards();
    for (let i = 0; i < cards.length; i++) {
      const card = createCardElement(cards[i]);
      targetElement.appendChild(card);
    }
  }
  /**
   * 手札の合計を表示するメソッド
   * @param id index.htmlから取得した手札の合計を表示するブロックのID
   * @param totalNum　手札の合計
   */
  export function totalNum(inHands: InHands) {
    const targetElement = getElement(ElementId.TOTAL_NUMBER);
    targetElement.textContent = inHands.culcNumber().toString();
  }

  /**
   * ステータスメッセージとボタンの表示を更新する
   * @param inHands 手札クラス
   */
  export function updateStatus(inHands: InHands) {
    const status = Game.MainLogic.judgeByCards(inHands);
    switch (status) {
      case Game.Status.JACK:
        setStatusMessage("ブラックジャックです。");
        toggleDisplayButtons(true);
        break;
      case Game.Status.EXACT:
        setStatusMessage("21です。");
        toggleDisplayButtons(true);
        break;
      case Game.Status.OVER:
        setStatusMessage("バーストです。");
        toggleDisplayButtons(true);
        break;
      case Game.Status.UNDER:
        toggleDisplayButtons(false);
        break;
      default:
        throw new Error("ゲームステータスが返ってきません。");
    }
  }

  /**
   * ボタンの表示/非表示を切り替えるメソッド
   */
  function toggleDisplayButtons(enableFinish: boolean) {
    const reloadElement = getElement(ElementId.RELOAD_BUTTON);
    const buttonAreaElement = getElement(ElementId.BUTTON_AREA);
    if (enableFinish) {
      reloadElement.style.display = "block";
      buttonAreaElement.style.display = "none";
    } else {
      reloadElement.style.display = "none";
      buttonAreaElement.style.display = "block";
    }
  }

  /**
   * ステータスメッセージをセットするメソッド
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
}
