/**
 * Copyright 2022 - Bakaran Project
 * author @triandamai
 * **/
import { useSession } from '@/composables/session'
import axios from 'axios'

export const BASE_URL = 'http://localhost:8001'

export type BaseResponse<T> = {
  success: boolean
  message: string
  data: T
}
export type BasePaging<T> = {
  currentPage: number;
  totalPage: number;
  totalItem: number;
  data: Array<T>,

}




export function useApi() {
  const buildUrlWithToken = (url: string) => `${BASE_URL}${url}`

  function get<T>(url: string): Promise<BaseResponse<T | null>> {
    return new Promise(async (resolve) => {
      const { status, data } = await axios.get(buildUrlWithToken(url), {
        headers: {
          'content-type': 'application/json',
        }
      })
      if (status >= 200 && status <= 209) {
        resolve({
          success: true,
          message: "",
          data: data
        })
        return
      }
      resolve({
        success: false,
        message: "",
        data: null
      })
    })
  }

  function post<T>(url: string, body: any): Promise<BaseResponse<T | null>> {
    return new Promise(async (resolve) => {
      const { status, data } = await axios.post(buildUrlWithToken(url), body, {
        headers: {
          'content-type': 'application/json'
        }
      })
      if (status >= 200 && status <= 209) {
        resolve({
          success: true,
          message: "",
          data: data
        })
        return
      }
      resolve({
        success: false,
        message: "",
        data: null
      })
    })
  }

  function put<T>(url: string, body: any): Promise<BaseResponse<T | null>> {
    return new Promise(async (resolve) => {
      const { status, data } = await axios.put(buildUrlWithToken(url), body, {
        headers: {
          'content-type': 'application/json'
        }
      })
      if (status >= 200 && status <= 209) {
        resolve({
          success: true,
          message: "",
          data: data
        })
        return
      }
      resolve({
        success: false,
        message: "",
        data: null
      })
    })

  }
  function remove<T>(url: string): Promise<BaseResponse<T | null>> {
    return new Promise(async (resolve) => {
      const { status, data } = await axios.delete(buildUrlWithToken(url), {
        headers: {
          'content-type': 'application/json'
        }
      })
      if (status >= 200 && status <= 209) {
        resolve({
          success: true,
          message: "",
          data: data
        })
        return
      }
      resolve({
        success: false,
        message: "",
        data: null
      })

    })
  }
  function postFormData<T>(url: string, body: FormData): Promise<BaseResponse<T | null>> {
    return new Promise(async (resolve) => {
      const { status, data } = await axios.postForm(buildUrlWithToken(url), body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (status >= 200 && status <= 209) {
        resolve({
          success: true,
          message: "",
          data: data
        })
        return
      }
      resolve({
        success: false,
        message: "",
        data: null
      })
    })
  }

  return {
    get,
    post,
    put,
    remove,
    postFormData
  }
}

export function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr)
    const group = prev[groupKey] || []
    group.push(curr)
    return {
      ...prev, [groupKey]: group
    }
  }, {})
}
