import { ADD_QUESTION, DELETE_QUESTION } from "../actions/questionAction";

const default_questions ={
    question : 30
}

const questionReducer = (state = default_questions, action) => {
    switch(action.type){
        case ADD_QUESTION: {
            return {
                ...state,
                // question: state.question + action.payload
                question: action.payload
            }
        }

        case DELETE_QUESTION: {
            return {
                ...state,
                question: state.question - action.payload
            }
        }
        default: return state;
    }
}

export default questionReducer;