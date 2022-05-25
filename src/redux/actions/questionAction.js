export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';

export const add_question_action = (cant) => {
    return {
        type: ADD_QUESTION,
        payload: cant
    }

}

export const delete_question_action = (cant) => {
    return {
        type: DELETE_QUESTION,
        payload: cant
    }

}