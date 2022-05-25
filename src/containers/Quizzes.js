import React, { useEffect } from 'react';
import { loggedIn, logout } from "../AuthHelperMethods";
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import QuizzesList from '../components/Quizzes/QuizzesList';

const Quizzes = () => {
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate("/login");
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

  return (
    <>
      <p className="titleSections"> {"Bienvenido: " + localStorage.getItem('name_user')}<Button onClick={onLogout}>(Salir)</Button></p>
      <p className="titleSections" style={{ display: 'inline-block' }}>Adm Cuestionarios </p>
      <QuizzesList />
    </>
  );
};

export default Quizzes;
