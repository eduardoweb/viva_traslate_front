import React, { useState } from 'react'
import { Grid, Container, Paper, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { setToken } from "../../AuthHelperMethods";
import swal from 'sweetalert';
import { Link } from "react-router-dom";

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

const Registro = () => {


	const [body, setBody] = useState({ name: '', email: '', password: '',  age: 1})
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

		if (body.name == "") {
			swal({ text: "Nombre vacio", icon: "error", timer: "10000" });
			return;
		}


		if (body.email == "") {
			swal({ text: "Email vacio", icon: "error", timer: "10000" });
			return;
		}

		if (body.password == "") {
			swal({ text: "Clave vacia", icon: "error", timer: "10000" });
			return;
		}

		const { data } = await Axios.post(`${process.env.REACT_APP_RUTA_API}/api/auth/register`, body)
		if (!data.errors) {
			setUsuario(data.data.user);
			setToken(data.data.token);
			localStorage.setItem('name_user', data.data.user.name);
			swal({ text: "Registro Exitoso!", icon: "success", timer: "7000" });
			navigate("/");
		} else {
			swal({ text: data.errors, icon: "error", timer: "10000" });
		}
	}

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
				<div className={classes.div}>
					<Typography component='h1' variant='h5'>Registrar Nuevo Usuario</Typography>
					<form className={classes.form}>
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
							REGISTRAR
						</Button>
					</form>
				</div>
				<div className="p-mb-3 p-text-center">Regístrate <Link to='/dashboard'>aquí</Link></div>
			</Container>
		</Grid>
	)
}

export default Registro
