import { combineReducers } from "redux";
import buscador from "./answersFindReducer";
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
    questionReducer,
    buscador
});

export default rootReducer;