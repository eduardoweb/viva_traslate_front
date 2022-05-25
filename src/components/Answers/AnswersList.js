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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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
    TextField,
    Select
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

const AnswersList = ({ open = false, setOpen = false, answers, idQues }) => {

    const httpService = new HttpService();
    const [openEditA, setOpenEditA] = useState(false);
    const [respuesta, setRespuesta] = useState({});
    const [editBtnQ, setEditBtnQ] = useState(false);
    const [createBtnQ, setCreateBtnQ] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClose = () => {
        setOpen((prv) => ({ ...prv, answers: false }));
    };

    const goToAction = (data, action) => () => {
        if (action === 'edit') {
            setRespuesta(data);
            setOpenEditA(true);
            setEditBtnQ(true)
            setCreateBtnQ(false);
        }
        if (action === 'create') {
            setRespuesta(data);
            setOpenEditA(true);
            setEditBtnQ(false);
            setCreateBtnQ(true);
        };

        if (action === 'delete') {
            setRespuesta(data);
            setOpenDelete(true);
        }

    };

    const handleChange = e => {
        setRespuesta({
            ...respuesta,
            [e.target.name]: e.target.value
        });
    };
    const onCreateA = async (e) => {

        if (respuesta == "") {
            swal({ text: "Nombre Vacio", icon: "error", timer: "10000" });
            return;
        }

        if (respuesta.respuesta == null) {
            swal({ text: "Campo respuesta Vacio", icon: "error", timer: "10000" });
            return;
        }

        if (respuesta.respuesta == 1) {
            respuesta.isCorrect = true;
        }

        if (respuesta.respuesta == 2) {
            respuesta.isCorrect = false;
        }

        respuesta.questionId = idQues;

        ; setOpenEditA(false);
        httpService.createAnswers(respuesta)
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

    const onUpdateA = async (e) => {
        if (respuesta.name == "") {
            swal({ text: "Nombre Vacio", icon: "error", timer: "10000" });
            return;
        }

        if (respuesta.respuesta == null) {
            swal({ text: "Campo respuesta Vacio", icon: "error", timer: "10000" });
            return;
        }

        if (respuesta.respuesta == 1) {
            respuesta.isCorrect = true;
        }

        if (respuesta.respuesta == 2) {
            respuesta.isCorrect = false;
        }

        setOpenEditA(false);
        httpService.editAnswers(respuesta)
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

    const handleCloseEve = (action) => () => {
        if (action === 'delete') {
            setOpenDelete(false);
        }
    };

    const onDeleteA = async (e) => {
        setOpenDelete(false);
        httpService.deleteAnswers(respuesta)
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
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open.answers} onClose={handleClose}>
                <BootstrapDialogTitle id="customized-dialog-title" > Lista de Respuestas </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box style={{ float: 'right' }}>
                        <Button variant="outlined" style={{ color: '#fff', background: '#00AFA4', border: 0 }} onClick={goToAction('', 'create')}>
                            Agregar Respuesta
                        </Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className="headTable"> Respuestas</TableCell>
                                    <TableCell align="center" className="headTable"> Correcta</TableCell>
                                    <TableCell align="center" className="headTable">Accion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {answers &&
                                    answers.data &&
                                    answers.data.map((row) => (
                                        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row" align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                {row.isCorrect == true ? "SI" : "NO"}
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
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={openEditA}>
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
                        value={respuesta.name}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Correcta</InputLabel>
                        <Select

                            name="respuesta"
                            value={respuesta.respuesta}
                            label="Correcta"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Si</MenuItem>
                            <MenuItem value={2}>No</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {createBtnQ && (
                        <Button autoFocus onClick={onCreateA}>Agregar</Button>
                    )}
                    {editBtnQ && (
                        <Button autoFocus onClick={onUpdateA}>Actualizar</Button>
                    )}
                </DialogActions>
            </BootstrapDialog>

            {/* Modal delete Answers */}
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
                    <Button onClick={onDeleteA}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AnswersList;
