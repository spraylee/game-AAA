/**
 * 等待
 * @param timeout 等待时间（ms）
 */
export const sleep = (timeout: number) =>
  new Promise(resolve => window.setTimeout(resolve, timeout))
