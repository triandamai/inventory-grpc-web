/**
 * Copyright 2022 - Bakaran Project
 * author @triandamai
 * **/
import { useSession } from '@/composables/session'
import axios, { AxiosResponse } from 'axios'

export const BASE_URL = 'https://api.maos.bakaranproject.com'

export type BaseResponse<T> = {
  success: boolean
  message: string
  data: T
}
export type BasePaging<T> = {
  current_page: number,
  last_page: number,
  from: number,
  to: number,
  total: number,
  first_page_url: string,
  last_page_url: string,
  path: string,
  data: Array<T>,
  link: Array<{ url: string | null, label: string, active: boolean }>,
  per_page: number,
  prev_page_url: string | null,

}


/**
 * Http interceptor
 * giving final result from variant response Backend
 * **/
function onError(err: any) {
  if (err.response) {
    const { status, data } = err.response
    const message = () => {
      if (!status) return 'Terjadi Kesalahan pada sistem, akan kami perbaiki segera'
      if (status == 401) return 'Akun yang anda masukkan tidak dikenali'

      return 'Kami mengalami masalah, coba beberapa saat lagi'
    }
    return Promise.resolve<BaseResponse<any>>({
      success: false,
      message: message(),
      data: null,
    })
  }
  return Promise.resolve<BaseResponse<any>>({
    success: false,
    message: 'Kami mengalami masalah, coba beberapa saat lagi',
    data: null,
  })
}

function onResponse(res: AxiosResponse<any, any>): BaseResponse<any> {
  const { status, data } = res

  let errMessage = ''
  if (data.message) {
    if (Array.isArray(data.message)) {
      data.message.forEach((element: string) => {
        errMessage += element
      })
    } else {
      errMessage = data.message
    }
  }

  if (status >= 200 && status <= 209) {
    if (data.code > 0) {
      return {
        success: true,
        data: data.data,
        message: errMessage,
      }
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
  /***
   * automatic add query token at the ends of url
   * @example https://example.com/api/book?token=<TOKEN>
   * @example https://example.com/api/book?page=0&token=<TOKEN>
   * @returns complete url
   */
  function buildUrlWithToken(url: string) {
    const token = session.getToken()
    if (token != null || token != undefined) {
      const separator = url.includes('?') ? `&token=${token}` : `?token=${token}`

      return `${BASE_URL}${url}${separator}`
    }
    return url
  }

  const getAxios = () => {
    axios.interceptors.response.use(onResponse, onError)
    const token = session.getAccessToken()
    if (token != null || token != undefined) {
      axios.defaults.headers.common['ApiKey'] = `${token}`
    }
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
