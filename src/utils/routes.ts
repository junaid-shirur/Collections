import { pathToRegexp } from 'path-to-regexp'
import { Maybe } from './types'
import Config from '../config'
const { reader } = Config
const readerRoutes = reader.routes
export const matchPath: <T = any>(match: string) => (path: string) => Maybe<T> = match => {
    // precompute regex
    let keys: Array<any> = []
    // @ts-ignore
    const re = pathToRegexp(match, keys)
    return path => {
        const matched = re.exec(path)
        if (!matched) return matched
        const url = matched[0]
        const values = matched.slice(1)
        // @ts-ignore
        return keys.reduce((prev, curr, idx) => {
            prev[curr.name] = values[idx]
            return prev
        }, ({} as any))
    }
}

const feedRouteMatch = matchPath<any>(readerRoutes.discover)

export const feedRoute: (path: string) => Maybe<any> = path => {
    const matched = feedRouteMatch(path)
    if (!matched) return matched
    return matched
}

export const isFeedRoute: (path: string) => boolean = path => !!feedRouteMatch(path)