import axios from "axios"


export type AppConfig = {
    reader: ReaderConfig
    auth: AuthConfig
}

export type RouteConfig<T> = { routes: T }
export type Route = string
export type Paginated = {
    pageSize: number
    pageBuffer: number
}
export type ReaderRoutes = {
    discover: Route
}

export type AuthRoutes = {
    login: Route
    register: Route
}

export type ReaderConfig = Paginated & RouteConfig<ReaderRoutes>
export type AuthConfig = RouteConfig<AuthRoutes>

export const reader: ReaderConfig = {
    pageSize: 30,
    pageBuffer: 3,
    routes: {
        discover: "/home",
    }
}

export const auth: AuthConfig = {
    routes: {
        login: '/login',
        register: '/register'
    }
}
export const Axios = axios.create({
    baseURL: 'http://localhost:4000/api',
})
const defaultConfig: AppConfig = {
    reader,
    auth
}


export default defaultConfig