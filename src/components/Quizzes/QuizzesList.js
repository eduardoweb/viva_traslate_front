import React, { useState, useEffect } from 'react';
import { HttpService } from '../../apis/HttpService';
import { Paper, Container, Tooltip, IconButton, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@material-ui/core';
import Draggable from 'react-draggable';
import DialogContentText from '@mui/material/DialogContentText';
import QuestionsList from '../Questions/QuestionsList';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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



const QuizzesList = () => {
    const httpService = new HttpService();
    const [quizzes, setQuizzes] = useState([]);
    const [body, setBody] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDetail, setOpenDetail] = useState({ detail: false});
    const [disabledEdit, setDisabledEdit] = useState(false);
    const [disabledDelete, setDisabledDelete] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const [createBtn, setCreateBtn] = useState(false);
    const [questions, setQuestion] = useState([]);
    const [idQu, setIdQu] = useState(0);

    useEffect(() => {
        httpService.getQuizzesList().then(data => { setQuizzes(data); });
    }, []);

    const handleChange = e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        });
    };

    const onUpdate = async (e) => {
        if (body.name == "") {
            swal({ text: "Nombre Vacio", icon: "error", timer: "10000" });
            return;
        }
        setDisabledEdit(true);
        setOpenEdit(false);
        httpService.editQuiz(body)
            .then((res) => {
                if (res.error) {
                    setDisabledEdit(false);
                    swal({ text: res.error, icon: "error", timer: "3000" });
                } else {
                    setDisabledEdit(false);
                    httpService.getQuizzesList().then(data => { setQuizzes(data); });
                    swal({ text: "Actualización Exitosa", icon: "success", timer: "7000" });
                }
            })
            .catch((err) => {
                swal({ text: err.error, icon: "error", timer: "3000" });
                setDisabledEdit(false);
            });
    };

    const onDelete = async (e) => {
        setDisabledDelete(true);
        setOpenDelete(false);
        httpService.deleteQuiz(body)
            .then((res) => {
                if (res.error) {
                    setDisabledDelete(false);
                    swal({ text: res.error, icon: "error", timer: "3000" });
                } else {
                    setDisabledDelete(false);
                    httpService.getQuizzesList().then(data => { setQuizzes(data); });
                    swal({ text: "Eliminación Exitosa", icon: "success", timer: "7000" });
                }
            })
            .catch((err) => {
                swal({ text: err.error, icon: "error", timer: "3000" });
                setDisabledDelete(false);
            });
    };

    const onCreate = async (e) => {
        if (body == "") {
            swal({ text: "Nombre Vacio", icon: "error", timer: "10000" });
            return;
        }
        setDisabledEdit(true);
        setOpenEdit(false);
        httpService.createQuiz(body)
            .then((res) => {
                if (res.error) {
                    setDisabledEdit(false);
                    swal({ text: res.error, icon: "error", timer: "3000" });
                } else {
                    setDisabledEdit(false);
                    httpService.getQuizzesList().then(data => { setQuizzes(data); });
                    swal({ text: "Creacción Exitosa", icon: "success", timer: "7000" });
                }
            })
            .catch((err) => {
                swal({ text: err.error, icon: "error", timer: "3000" });
                setDisabledEdit(false);
            });
    };

    const handleClose = (action) => () => {
        if (action === 'edit') {
            setOpenEdit(false);
        }
        if (action === 'delete') {
            setOpenDelete(false);
        }
    };

    const goToAction = (data, action) => () => {
        if (action === 'create') {
            setBody(data);
            setOpenEdit(true);
            setEditBtn(false);
            setCreateBtn(true);
        };

        if (action === 'edit') {
            setBody(data);
            setOpenEdit(true);
            setEditBtn(true);
            setCreateBtn(false);
        }

        if (action === 'delete') {
            setBody(data);
            setOpenDelete(true);
        }

        if (action ==='detail'){
            setBody(data);
            httpService.getQuestionsListByQuiz(data._id).then(data => { setQuestion(data); });
            setOpenDetail((prv) => ({ ...prv, [action]: true }));
            setIdQu(data._id);
        }
    };

    const columns = [
        {
            name: 'name',
            options: {
                customHeadLabelRender: () => 'Titulo',
                setCellHeaderProps: () => ({ style: { paddingLeft: '6.3em', color: '#00AFA4', background: '#F0F0F0', fontWeight: 'bolder' } }),
                setCellProps: () => ({ style: { width: '25%' } }),
            },
        },
        {
            name: 'accions',
            options: {
                filter: false,
                sort: false,
                setCellHeaderProps: () => ({ style: { color: '#00AFA4', background: '#F0F0F0', fontWeight: 'bolder' } }),
                customHeadLabelRender: () => 'Editar',
                setCellProps: () => ({ style: { width: '25%' } }),
                customBodyRenderLite: (val, index) => (
                    <Container key={index}>
                        <Tooltip title="Editar">
                            <IconButton aria-label="detail" onClick={goToAction(quizzes.data[val], 'edit')}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton aria-label="detail" onClick={goToAction(quizzes.data[val], 'delete')}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Detalle">
                            <IconButton aria-label="detail" onClick={goToAction(quizzes.data[val], 'detail')}>
                                <AssignmentIcon />
                            </IconButton>
                        </Tooltip>
                    </Container>

                ),
            },
        },
    ];

    const getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MuiButton: {
                    root: {
                        color: '#00AFA4',
                        fontWeight: 'bolder',
                    },
                },
                MuiToolbar: {
                    regular: {
                        height: '32px',
                        minHeight: '32px',
                        '@media (min-width: 600px)': {
                            minHeight: '40px',
                        },
                    },
                },
                MUIDataTableBodyCell: {
                    root: {
                        textAlign: 'center',
                    },
                },
                MUIDataTableHeadCell: {
                    root: {
                        textAlign: 'center',
                    },
                    fixedHeader: {
                        zIndex: 0,
                    },
                    contentWrapper: {
                        display: 'block',
                        textAlign: 'center',
                    },
                },
            },
        });

    return (
        <>
            <Box style={{ float: 'right' }}>
                <Button
                    variant="outlined"
                    style={{ color: '#fff', background: '#00AFA4', border: 0 }}
                    onClick={goToAction('', 'create')}
                >
                    Crear Cuestionario
                </Button>
            </Box>
            <div className="content">
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        data={quizzes.data}
                        columns={columns}
                        options={{
                            filter: false,
                            print: false,
                            download: false,
                            selectableRowsHeader: false,
                            selectableRows: 'none',
                        }}
                        components={Paper}
                    />
                </MuiThemeProvider>

                {/* Modal Edit quiz */}
                <Dialog open={openEdit} aria-labelledby="form-dialog-title">
                    <BootstrapDialog onClose={handleClose('edit')} aria-labelledby="customized-dialog-title" open={openEdit}>
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose('edit')}> Actualizar Cuestionario</BootstrapDialogTitle>
                        <DialogContent dividers>
                            <TextField
                                fullWidth
                                autoFocus
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Nombre'
                                name='name'
                                value={body.name}
                                onChange={handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            {createBtn && (
                                <Button disabled={disabledEdit} autoFocus onClick={onCreate}>Guardar</Button>
                            )}
                            {editBtn && (
                                <Button disabled={disabledEdit} autoFocus onClick={onUpdate}>Actualizar</Button>
                            )}
                        </DialogActions>
                    </BootstrapDialog>
                </Dialog>

                {/* Modal delete quiz */}
                <Dialog open={openDelete} onClose={handleClose('edit')} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Advertencia
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        ¿Esta seguro que desea eliminar este registro?.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose('delete')}>
                            Cancelar
                        </Button>
                        <Button disabled={disabledDelete} onClick={onDelete}>Eliminar</Button>
                    </DialogActions>
                </Dialog>

                {/* Modal Detail Questions */}
                <QuestionsList open={openDetail} setOpen={setOpenDetail} questions={questions} idQu={idQu}></QuestionsList>


            </div>
        </>
    );
};

export default QuizzesList;
