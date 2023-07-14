import { Card } from "./card";
export class Disp {
  /**
   * 手札を表示するメソッド
   * @param id index.htmlから取得した手札を表示するブロックのID
   * @param cards 手札の配列
   */
  static cardInHands(id: HTMLElement | null, cards: Card.elements[]) {
    for (let i = 0; i < cards.length; i++) {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML =
        "<p>" + cards[i].num + "</p>" + "<p>" + cards[i].symbol + "</p>";
      if (id) {
        id.appendChild(card);
      }
    }
  }
  /**
   * 手札の合計を表示するメソッド
   * @param id index.htmlから取得した手札の合計を表示するブロックのID
   * @param totalNum　手札の合計
   */
  static totalNum(id: HTMLElement | null, totalNum: number) {
    if (id) {
      id.textContent = totalNum.toString();
    }
  }
}
