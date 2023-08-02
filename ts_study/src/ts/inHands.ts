import { Card } from "./card";
export class InHands {
  /**
   * 手札の識別ID
   */
  static currentId: number = 1;
  /**
   * 識別IDを保持する変数
   */
  id: number;
  /**
   * 手札を定義する変数
   */
  private cards: Card.elements[] = [];
  /**
   * エースを定義する
   */
  private ACE: number = 1;
  /**
   * ハイカード（10以上）を定義する
   */
  private HIGH_CARD: number = 10;
  /**
   * コンストラクタ：インスタンス化された際にidをインクリメントする
   */
  constructor() {
    this.id = InHands.currentId;
    InHands.currentId++;
  }

  /**
   * 手札を作るメソッド
   * @param card デッキから引いたカード1枚のデータ
   */
  addCard(card: Card.elements) {
    this.cards.push(card);
  }
  /**
   * 現在の手札を返すメソッド
   */
  getCards(): Card.elements[] {
    return this.cards;
  }
  /**
   * 手札のカードの合計を出すメソッド
   * @returns 手札の合計値を返す
   */
  culcNumber(): number {
    let numberOfAce = 0;
    // 合計値を定義
    let total = 0;
    // 手札1枚ずつの判定
    this.cards.forEach((card) => {
      // 裏のカードは計算しない
      if (!card.visible) {
        return;
      }

      if (card.num === this.ACE) {
        numberOfAce++;
      } else if (card.num > this.HIGH_CARD) {
        total += this.HIGH_CARD;
      } else {
        total += card.num;
      }
    });
    // 合計と1の枚数が11未満なら、1の枚数に10を足す（11と判断されるaceの数は1枚以上にはならないから）
    if (numberOfAce !== 0 && total + numberOfAce <= 11) {
      total += numberOfAce + this.HIGH_CARD; //HIGH_CARD === 10
    } else {
      total += numberOfAce;
    }
    return total;
  }
  /**
   * ナチュラルブラックジャックの判定をするメソッド
   * @returns ナチュラルブラックジャックの場合true
   */
  isBlackJack(): boolean {
    // 手札が2枚がじゃなければfalse
    if (this.cards.length !== 2) {
      return false;
    }
    // エースがなければfalse
    const hasAce = this.cards.some((card) => card.num === this.ACE);
    if (!hasAce) {
      return false;
    }
    // ハイカードがなければfalse
    const hasHighCard = this.cards.some((card) => card.num >= this.HIGH_CARD);
    if (!hasHighCard) {
      return false;
    }

    return true;
  }

  /**
   * 手札を表にするメソッド
   */
  openCards() {
    this.cards.forEach((card) => {
      if (card.visible) {
        return;
      }
      card.visible = true;
    });
  }
}
