/**
 * Copyright 2022 - Bakaran Project
 * author @triandamai
 * **/
import { useSession } from '@/composables/session'
import axios, { AxiosResponse } from 'axios'

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


/**
 * Http interceptor
 * giving final result from variant response Backend
 * **/
async function onError(err: any) {

  return Promise.resolve<BaseResponse<any>>({
    success: false,
    message: err.response.data.message,
    data: null,
  })
}

function onResponse(res: AxiosResponse<any, any>): BaseResponse<any> {
  const { status, data } = res
  console.log(data)

  let errMessage = data.message

  if (status >= 200 && status <= 209) {
    return {
      success: true,
      data: data,
      message: errMessage,
    }
  }

  return {
    success: false,
    message: errMessage,
    data: null,
  }
}

export function useApi() {
  const session = useSession()

  function buildUrlWithToken(url: string) {

    return `${BASE_URL}${url}`
  }

  const getAxios = () => {
    axios.interceptors.response.use(onResponse, onError)
    return axios
  }
  async function get<T>(url: string): Promise<BaseResponse<T>> {
    return getAxios().get(buildUrlWithToken(url), {
      headers: {
        'content-type': 'application/json',
      }
    })
  }

  async function post<T>(url: string, body: any): Promise<BaseResponse<T>> {
    return getAxios().post(buildUrlWithToken(url), body, {
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  async function put<T>(url: string, body: any): Promise<BaseResponse<T>> {
    return getAxios().put(buildUrlWithToken(url), body, {
      headers: {
        'content-type': 'application/json'
      }
    })
  }
  async function remove<T>(url: string): Promise<BaseResponse<T>> {
    return getAxios().delete(buildUrlWithToken(url), {
      headers: {
        'content-type': 'application/json'
      }
    })
  }
  async function postFormData<T>(url: string, body: FormData): Promise<BaseResponse<T>> {
    return getAxios().postForm(buildUrlWithToken(url), body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
