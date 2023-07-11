// 4種のマークを列挙型にする
export enum SymbolMark {
  SPADE,
  HEART,
  CLOVER,
  DIAMOND,
}
// カード1枚の型を作成
export type CardElement = {
  // カードの数字
  readonly num: number;
  // マーク
  readonly symbol: SymbolMark;
};
