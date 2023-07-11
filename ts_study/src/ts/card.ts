// 4種のマークを列挙型にする
export enum SymbolMark {
  SPADE,
  HEART,
  CLOVER,
  DIAMOND,
}
// カード1枚の型を作成
export type cardElement = {
  num: number;
  symbol: SymbolMark;
};
// カード1枚分のデータを定義するクラス
export class Card {
  private card: cardElement;

  constructor(num: number, symbol: SymbolMark) {
    this.card = { num, symbol };
  }
}
