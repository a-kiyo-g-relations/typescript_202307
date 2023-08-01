import { ActionManager } from "./actionManager";

// ボタンにアクションを付与
ActionManager.initializeButton();

// ゲームスタート
await ActionManager.startGame();
