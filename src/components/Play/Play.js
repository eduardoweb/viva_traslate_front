import React, { useEffect, useState } from "react";
import { loggedIn, logout } from "../../AuthHelperMethods";
import { useNavigate, Link } from 'react-router-dom';
import { HttpService } from '../../apis/HttpService';
import styled from 'styled-components';
import { Button, Paper } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import Draggable from 'react-draggable';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch, useSelector } from "react-redux";
import { add_question_action, delete_question_action } from "../../redux/actions/questionAction";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import swal from 'sweetalert';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import fetchAnswer from "../../redux/actions/answersFindAction";

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-size: 18px;
`;

const Play = () => {
    const questionReducer = useSelector((state) => state.questionReducer.question);
    const buscador = useSelector((state) => state.buscador);

    const dispatch = useDispatch();

    const httpService = new HttpService();
    const navigate = useNavigate();
    const [preguntas, setPreguntas] = useState([]);
    const [openPreguntas, setOpenPreguntas] = useState(false);
    const [answers, setAnswers] = useState([]);


    function onLogout() {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        httpService.getQuestionsList().then(data => { setPreguntas(data); });
    }, []);

    function onPlay() {
        let nro = Math.round(Math.random() * ((preguntas.data.length - 1) - 0)) + 0;

        dispatch(add_question_action(preguntas.data[nro].name));

        // httpService.getAnswersListByQues(preguntas.data[nro]._id).then(data => { setAnswers(data); });

        dispatch(fetchAnswer(preguntas.data[nro]._id));

        setOpenPreguntas(true);

        console.log(preguntas);
        console.log(nro);
        console.log(answers);

    }

    function onFollw() {
        let nro = Math.round(Math.random() * ((preguntas.data.length - 1) - 0)) + 0;

        dispatch(add_question_action(preguntas.data[nro].name));

        // httpService.getAnswersListByQues(preguntas.data[nro]._id).then(data => { setAnswers(data); });

        dispatch(fetchAnswer(preguntas.data[nro]._id));

        console.log(preguntas);
        console.log(nro);
        console.log(answers);

    }

    useEffect(() => {
        function checkSesion() {
            if (!loggedIn()) {
                navigate("/login");
                return;
            }
        }
        checkSesion();
    }, []);

    const handleClose = () => {
        setOpenPreguntas(false);
    };



    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState();

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (value === "11") {
            swal({ text: "MUY BIEN! CORRECTO!", icon: "success", timer: "7000" });
            setError(false);
        } else if (value !== "11") {
            swal({ text: "UPS! no, estas mal :(", icon: "error", timer: "7000" });
            setError(true);
        } else {
            swal({ text: "Selecciona una respuesta.", icon: "error", timer: "7000" });
            setError(true);
        }
    };

    return (
        <>
            <StyledContentTitle>
                <p className="titleSections"> {"VAMOS A JUGAR: " + localStorage.getItem('name_user')}</p>
                <p className="titleSections"><Button onClick={onLogout}>(Salir)</Button></p>
            </StyledContentTitle>
            <div className="content">
                <StyledContent>
                    <div className="mainMenu">
                        <Button onClick={onPlay}>CLICK AQUI PARA COMENZAR</Button>
                    </div>
                </StyledContent>
            </div>

            <Dialog open={openPreguntas} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {questionReducer}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form onSubmit={handleSubmit}>
                            <FormControl sx={{ m: 3 }} error={error} variant="standard">
                                <RadioGroup
                                    aria-labelledby="demo-error-radios"
                                    name="quiz"
                                    value={value}
                                    onChange={handleRadioChange}
                                >
                                    {buscador.loading && <div className="text-warning">Buscando Respuestas...</div>}
                                    {
                                        buscador.answer.length >= 1 &&
                                        buscador.answer[0].data.map((row) => (
                                            <FormControlLabel key={row._id} value={row.isCorrect == true ? "11" : row._id} control={<Radio />} label={row.name} />
                                        ))
                                    }
                                    {buscador.error !== '' && <span className="text-danger">{buscador.error}</span>}

                                </RadioGroup>
                                <FormHelperText>{helperText}</FormHelperText>
                                {buscador.answer.length >= 1 && (
                                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">Checkear!</Button>
                                )}
                                {buscador.answer[0].length <= 0 && (
                                     <div className="text-warning">Sin Respuestas...</div>
                                )}
                            </FormControl>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={onFollw}>Siguiente Pregunta</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Play;
