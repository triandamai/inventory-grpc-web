export const useSession = () => {
  function setUser(data:any) {
    const result = btoa(JSON.stringify(data))

    sessionStorage.setItem('dfghcghvmj', result)
  }

  function getUser() {
    const user:any = sessionStorage.getItem('dfghcghvmj')
    const result = atob(user)
    return user ? JSON.parse(result) : null
  }

  function setToken(token:string) {
    sessionStorage.setItem('cjlsnd', token)
  }

  function getToken() {
    return sessionStorage.getItem('cjlsnd')
  }

  function setAccessToken(token:string) {
    sessionStorage.setItem('gfjhj', token)
  }

  function getAccessToken() {
    return sessionStorage.getItem('gfjhj')
  }

  function signOut() {
    sessionStorage.removeItem('gfjhj')
    sessionStorage.removeItem('dfghcghvmj')
    sessionStorage.removeItem('cjlsnd')
  }
  return {
    setUser,
    getUser,
    setToken,
    getToken,
    setAccessToken,
    getAccessToken,
    signOut,
  }
}
