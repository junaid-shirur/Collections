import { Images } from "../actions/types"

export const storeToken = (token: any) => {
    const prevToken = localStorage.getItem('accessToken')
    if (prevToken) localStorage.clear()
    localStorage.setItem('accessToken', token.accessToken)
    localStorage.setItem('refreshToken', token.refreshToken)
}
