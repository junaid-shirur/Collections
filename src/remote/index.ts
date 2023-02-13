import { Images, UserAuth } from "../actions/types"
import { Axios } from "../config"
import { storeToken } from "../utils/utils"

export async function createRemoteRequest(method: any, url: string, data: any = {}) {
    console.log(data, 'data')
    const response = new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            mode: 'cors',
            redirect: 'follow',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
    return response
}

export const signIn: (val: UserAuth) => any = async (val) => {
    return await Axios.post('/users/login', {
        username: 'test123',
        password: 'password'
    }).then(e => e)
}

export const fetchImages = async () => await Axios.get('/images').then(res => res.data)

export const deleteImages = async (imgIds: Array<string>) => await Axios.delete('/images/delete', { data: imgIds })

export const updateFavourite = async (req: any) => await Axios.post('/images/fav', { imgIds: req.imgIds, add: req.add })

export const uploadImg = async (req: Images) => await Axios.post('/images/add', req)