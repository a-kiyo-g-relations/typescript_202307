import { Card } from "./card";
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
}
