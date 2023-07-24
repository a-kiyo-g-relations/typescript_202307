export namespace Card {
  /**
   * カードの数字の最小値を定義
   */
  export const MIN_NUMBER: number = 1;
  /**
   * カードの数字の最大値を定義
   */
  export const MAX_NUMBER: number = 13;
  /**
   * マークの型を定義
   */
  type SymbolMark = string;
  /**
   * マークの配列を定義
   */
  export const SYMBOL_MARKS: SymbolMark[] = [
    "SPADE",
    "HEART",
    "CLOVER",
    "DIAMOND",
  ];

  /**
   * カードの裏表を定義
   */
  export enum ViewSide {
    FRONT,
    BACK,
  }

  /**
   * カード1枚分のデータの型定義
   */
  export type elements = {
    // カードの数字
    readonly num: number;
    // マーク
    readonly symbol: SymbolMark;
    // カードの裏表
    viewSide: ViewSide;
  };
}
