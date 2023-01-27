import { ref, customRef } from "vue"

// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// debounce

const debounce = (fn: (args: any[]) => any, delay = 0, immediate = false) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    if (immediate && !timeout) fn(args)
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn(args)
    }, delay)
  }
}

const useDebounceRef = (initialValue: any, delay: number, immediate: boolean) => {
  const state = ref(initialValue)
  const debunceRef = customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: debounce((value) => {
      state.value = value
      trigger()
    },
      delay,
      immediate)
  }))
}

