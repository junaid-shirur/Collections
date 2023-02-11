import {
    Action,
    AnyAction,
    ActionCreator,
    ActionCreatorsMapObject,
    Dispatch
} from 'redux'

// export type CustomAction = string | number | any

// export function bindActionCreators<A extends Action = any>(
//     actionCreators: ActionCreator<A> | ActionCreatorsMapObject<A>,
//     dispatch: Dispatch<A>
// ) {
//     if (typeof actionCreators === 'function') {
//         return bindActionCreator(actionCreators, dispatch)
//     }

//     if (typeof actionCreators !== 'object' || actionCreators === null) {
//         throw new Error(
//             `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators
//             }. ` +
//             `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
//         )
//     }

//     const boundActionCreators: ActionCreatorsMapObject = {}
//     for (const key in actionCreators) {
//         const actionCreator = actionCreators[key]
//         if (typeof actionCreator === 'function') {
//             boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
//         }
//     }
//     return boundActionCreators
// }

// function bindActionCreator<A extends Action = CustomAction, Ac extends ActionCreator<A> = ActionCreator<A>>(
//     actionCreator: Ac,
//     dispatch: Dispatch<A>
// ) {
//     return function (this: any, ...args: any[]) {
//         return dispatch(actionCreator.apply(this, args))
//     }
// }