import { Deck } from "./deck";
import { Game } from "./game";
import { InHands } from "./inHands";
import { Disp } from "./disp";

// スタート時にインスタンス化
const deck = new Deck();
const inHands = new InHands();

// ゲームのターン数を取得
let turnOrder = Game.MainLogic.turnOrder;

// 初回（ターン0）の場合は2回引く
while (turnOrder === 0) {
  const card = deck.drawCard();
  if (!card) {
    // 強制終了
  } else {
    inHands.addCard(card);
  }
  turnOrder++;
}
const card = deck.drawCard();
console.log(card);
if (!card) {
  // 強制終了
} else {
  inHands.addCard(card);
}

// 手札を表示する
const dispCardsId = document.getElementById("cardInHands");
Disp.cardInHands(dispCardsId, inHands.getCards());

// 手札の合計を表示する
const dispTotalNumId = document.getElementById("totalNum");
Disp.totalNum(dispTotalNumId, inHands.culcNumber());
