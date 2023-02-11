

export type commanAction<p = any> = {
    type: string
    payload: p
}

export type UserAuth = {
    username: string
    password: string
}
export type UserId = { userId: string }

export type UserAccount = UserAuth & UserId & {
    createdAt: number
}

export type Images = UserId & {
    _id: string
    thumbnail: string
    url: string
    description: string
    name: string
    createdAt: number
    favourite?: string
}
