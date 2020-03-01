import { ref } from '@vue/composition-api'

/**
 * 创建代表加载状态的响应值 isLoading 和 同步加载状态的方法 withLoading
 * @example const { isLoading, withLoading } = useLoading()
 *          const getData = async () => {
 *             const data = await withLoading(getDataByAjax())
 *          }
 */
export const useLoading = () => {
  const isLoading = ref(false)
  const withLoading = <T>(task: Promise<T>) => {
    isLoading.value = true
    task.finally(() => {
      isLoading.value = false
    })
    return task
  }
  return { isLoading, withLoading }
}
