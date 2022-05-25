import React, { useState, useEffect } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { setToken } from "../../AuthHelperMethods";
import swal from 'sweetalert';
import { Link  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_question_action, delete_question_action } from "../../redux/actions/questionAction";

const useStyles = makeStyles(theme => ({
	root: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh'
	},
	container: {
		opacity: '0.8',
		height: '60%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2)
	}
}))

const clearStorage = () => {
    localStorage.clear();
};

const Login = () => {

		const questionReducer = useSelector((state) => state.questionReducer.question);
		const dispatch = useDispatch();

	useEffect(() => {
        clearStorage();
        return () => { };
    }, []);

	const [body, setBody] = useState({ email: '', password: '' })
	const classes = useStyles()
	const navigate = useNavigate();
	const [usuario, setUsuario] = useState(null);

	const handleChange = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		});
	};

	async function onSubmit() {
		dispatch(add_question_action(1));
		if (body.email ==""){
			swal({ text: "Email vacio", icon: "error", timer: "10000" });
			return;
		}

		if (body.password ==""){
			swal({ text: "Clave vacia", icon: "error", timer: "10000" });
			return;
		}

		const { data } = await Axios.post(`${process.env.REACT_APP_RUTA_API}/api/auth/login`, body)
		if (!data.error) {
			setUsuario(data.data.user);
			setToken(data.data.token);
			localStorage.setItem('name_user', data.data.user.name);
			navigate("/");
		} else{
			let errors
			if (data.error == "USER_NOT_EXISTS"){
				errors= "Usuario Incorrecto";
			}
			if (data.error == "PASSWORD_INVALID"){
				errors= "Clave Invalida";
			}

			swal({ text: errors, icon: "error", timer: "10000" });
		}
	}

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
				<div className={classes.div}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>Sign In {questionReducer}</Typography>
					<form className={classes.form}>
						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Email'
							name='email'
							value={body.email}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Clave'
							name='password'
							value={body.password}
							onChange={handleChange}
						/>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							className={classes.button}
							onClick={() => onSubmit()}
						>
							Entrar
						</Button>
					</form>
				</div>
				<div className="p-mb-3 p-text-center">Regístrate <Link to='/registro'>aquí</Link></div>
			</Container>
		</Grid>
	)
}

export default Login;
