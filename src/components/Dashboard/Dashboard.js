import React, { useEffect } from "react";
import { loggedIn, logout } from "../../AuthHelperMethods";
import { useNavigate, Link } from 'react-router-dom';

import styled from 'styled-components';
import { Button } from '@material-ui/core';


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

const Dashboard = () => {

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
      <StyledContentTitle>
        <p className="titleSections"> {"Bienvenido: " + localStorage.getItem('name_user')}<Button onClick={onLogout}>(Salir)</Button></p>
        <p className="titleSections">Panel de Administracion</p>
      </StyledContentTitle>
      <div className="content">
        <StyledContent>
          <div className="mainMenu">
            <li>
              <Link to="/quizzes">
                <div className="orderMainMenu" />
                <p>Adm Cuestionarios</p>
              </Link>
            </li>
            <li>
              <Link to="/play">
                <div className="wavesMainMenu" />
                <p>JUGAR!</p>
              </Link>
            </li>
          </div>
        </StyledContent>
      </div>
    </>
  );
};

export default Dashboard;
