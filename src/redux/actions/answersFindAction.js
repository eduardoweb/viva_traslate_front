import { responsiveProperty } from "@mui/material/styles/cssUtils";
import axios from "axios";
const endpoint = process.env.REACT_APP_RUTA_API;

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';


export const fetchRequest = () => {
    return{
        type: FETCH_REQUEST
    }
}
export const fetchSuccess = (answer) => {
    return{
        type: FETCH_SUCCESS,
        payload: answer
    }
}
export const fetchFailure = (error) => {
    return{
        type: FETCH_FAILURE,
        payload: error
    }
}

const fetchAnswer = (valor) => {
    return(dispatch) =>{
        dispatch(fetchRequest());
        axios.get(`${endpoint}/api/answers/${valor}`)
        .then(response =>{
            dispatch(fetchSuccess([response.data]));
        })
        .catch(error =>{
            dispatch(fetchFailure('No se encontraron respuestas'));
        });
    }
}

export default fetchAnswer;