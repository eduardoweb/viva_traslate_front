import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "../actions/answersFindAction";

const initialState = {
    loading: false,
    answer: [],
    error: ''
}

const buscador = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                loading: false,
                answer: action.payload,
                error: ''
            }
        case FETCH_FAILURE:
            return {
                loading: false,
                answer: [],
                error: action.payload
            }
        default: return state;
    }
}

export default buscador  