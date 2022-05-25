import React, { useEffect } from 'react';
import { loggedIn } from "../AuthHelperMethods";
import { useNavigate, Link } from 'react-router-dom';

import QuizzesList from '../components/Quizzes/QuizzesList';

const Quizzes = () => {
  const navigate = useNavigate();

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
      <p className="titleSections" style={{ display: 'inline-block' }}>
        Adm Cuestionarios
      </p>
      <QuizzesList/>
    </>
  );
};

export default Quizzes;
