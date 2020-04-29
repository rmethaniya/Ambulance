
const INITIAL_STATE = {
    timeDuration: 5,
    ambTimeDuration: 10,
    rotaion :1,
}

export default function TestReducer(state = INITIAL_STATE, action) {
    console.log('Reducer Action ', action.type)
    switch (action.type) {
        case 'TIME_DURATION':
            return {
                ...state,
                timeDuration: action.timeDuration
            }
        case 'AMB_TIME_DURATION':
            return {
                ...state,
                ambTimeDuration: action.ambTimeDuration
            }
        case 'ROTAION_TYPE':
            return {
                ...state,
                rotaion: action.rotaion
            }
        default:
            return state
    }
}
