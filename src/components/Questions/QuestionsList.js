import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { HttpService } from '../../apis/HttpService';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import swal from 'sweetalert';
import { Box } from '@material-ui/core';
import Draggable from 'react-draggable';
import DialogContentText from '@mui/material/DialogContentText';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Container,
    Tooltip,
    TextField
} from "@material-ui/core";

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const QuestionsList = ({ open, setOpen, questions, idQu }) => {
    const httpService = new HttpService();
    const [openEditQ, setOpenEditQ] = useState(false);
    const [pregunta, setPregunta] = useState({});
    const [editBtnQ, setEditBtnQ] = useState(false);
    const [createBtnQ, setCreateBtnQ] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [idQues, setIdQues] = useState(0);
    const [openAnswers, setOpenAnswers] = useState({ detail: false });
    const [answers, setAnswers] = useState([]);

    const handleClose = () => {
        setOpen((prv) => ({ ...prv, detail: false }));
    };

    const handleCloseEve = (action) => () => {
        if (action === 'delete') {
            setOpenDelete(false);
        }
    };


    const goToAction = (data, action) => () => {
        if (action === 'edit') {
            setPregunta(data);
            setOpenEditQ(true);
            setEditBtnQ(true)
            setCreateBtnQ(false);
        }
        if (action === 'create') {
            setPregunta(data);
            setOpenEditQ(true);
            setEditBtnQ(false);
            setCreateBtnQ(true);
        };

        if (action === 'delete') {
            setPregunta(data);
            setOpenDelete(true);
        }

        if (action === 'answers') {
            setPregunta(data);
            httpService.getAnswersListByQues(data._id).then(data => { setAnswers(data); });
            setOpenAnswers((prv) => ({ ...prv, [action]: true }));
            setIdQues(data._id);
        }
    };

    const handleChange = e => {
        setPregunta({
            ...pregunta,
            [e.target.name]: e.target.value
        });
    };

    const onUpdateQ = async (e) => {
        if (pregunta.name == "") {
            swal({ text: "Nombre Vacio", icon: "error", timer: "10000" });
            return;
        }
        setOpenEditQ(false);
        httpService.editQuestions(pregunta)
            .then((res) => {
                if (res.error) {
                    swal({ text: res.error, icon: "error", timer: "3000" });
                } else {
                    swal({ text: "Actualización Exitosa", icon: "success", timer: "7000" });
                }
            })
            .catch((err) => {
                swal({ text: err.error, icon: "error", timer: "3000" });
            });
    };

    const onCreateQ = async (e) => {

        if (pregunta == "") {
            swal({ text: "Nombre Vacio", icon: "error", timer: "10000" });
            return;
        }
        pregunta.quizId = idQu;

        setOpenEditQ(false);
        httpService.createQuestion(pregunta)
            .then((res) => {
                if (res.error) {
                    swal({ text: res.error, icon: "error", timer: "3000" });
                } else {
                    swal({ text: "Creacción Exitosa", icon: "success", timer: "7000" });
                }
            })
            .catch((err) => {
                swal({ text: err.error, icon: "error", timer: "3000" });
            });
    };

    const onDeleteQ = async (e) => {
        setOpenDelete(false);
        httpService.deleteQuestion(pregunta)
            .then((res) => {
                if (res.error) {
                    swal({ text: res.error, icon: "error", timer: "3000" });
                } else {
                    swal({ text: "Eliminación Exitosa", icon: "success", timer: "7000" });
                }
            })
            .catch((err) => {
                swal({ text: err.error, icon: "error", timer: "3000" });

            });
    };

    return (
        <div>
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open.detail} onClose={handleClose}>
                <BootstrapDialogTitle id="customized-dialog-title" > Lista de Preguntas </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box style={{ float: 'right' }}>
                        <Button variant="outlined" style={{ color: '#fff', background: '#00AFA4', border: 0 }} onClick={goToAction('', 'create')}>
                            Agregar Pregunta
                        </Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className="headTable"> Pregunta</TableCell>
                                    <TableCell align="center" className="headTable">Accion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions &&
                                    questions.data &&
                                    questions.data.map((row) => (
                                        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row" align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Editar">
                                                    <IconButton aria-label="detail" onClick={goToAction(row, 'edit')}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Eliminar">
                                                    <IconButton aria-label="detail" onClick={goToAction(row, 'delete')}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Ver Resuestas">
                                                    <IconButton aria-label="detail" onClick={goToAction(row, 'answers')}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </BootstrapDialog>

            {/* Modal Edit Question */}
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={openEditQ}>
                <BootstrapDialogTitle id="customized-dialog-title"> Actualizar Preguntas</BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        autoFocus
                        color='primary'
                        margin='normal'
                        variant='outlined'
                        label='Pregunta'
                        name='name'
                        value={pregunta.name}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    {createBtnQ && (
                        <Button autoFocus onClick={onCreateQ}>Agregar</Button>
                    )}
                    {editBtnQ && (
                        <Button autoFocus onClick={onUpdateQ}>Actualizar</Button>
                    )}
                </DialogActions>
            </BootstrapDialog>


            {/* Modal delete question */}
            <Dialog open={openDelete} onClose={handleCloseEve('edit')} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Advertencia
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Esta seguro que desea eliminar este registro?.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseEve('delete')}>
                        Cancelar
                    </Button>
                    <Button onClick={onDeleteQ}>Eliminar</Button>
                </DialogActions>
            </Dialog>

            {/* Modal Detail Answers
            <QuestionsList open={openAnswers} setOpen={setOpenAnswers} answers={answers} idQues={idQues}></QuestionsList> */}


        </div>
    );
};
export default QuestionsList;
