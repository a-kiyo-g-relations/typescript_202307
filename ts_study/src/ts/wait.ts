/**
 * 処理停止関連の処理群
 */
export namespace Wait {
  /**
   * 指定秒数だけ処理を停止させる
   *
   * @param sec 秒数
   */
  export async function sec(sec: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
}
