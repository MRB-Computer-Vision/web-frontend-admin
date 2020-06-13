import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppBar from '../../components/AppBar';
import Launcher from '../../components/Launcher';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

// tipando componente no formato de funcao
const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar />
      <h3>Dashboard</h3>
      <br />
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/ClinicalEvaluation"
              title="Avaliação Clínica"
              detail="Consultar, Alterar ou Incluir novos dados para avaliação do paciente"
              disable={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/RaioX"
              title="Raio-X"
              detail="Solicitar laudo eletrônico para um exame"
              disable={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/"
              title="Tomografia"
              detail="Solicitar laudo eletrônico para um exame"
              disable
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/"
              title="Ultrassom"
              detail="Solicitar laudo eletrônico para um exame"
              disable
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/"
              title="Visualizar"
              detail="Imagens, laudos e a situação das solicitações das últimas 48 horas"
              disable
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/"
              title="Consulta Geral"
              detail="Base de exames e laudos solicitados desta instituição"
              disable
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/"
              title="Configurações"
              detail="Cadastros, critérios, regras e parâmetros do sistema"
              disable
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
            <Launcher
              to="/"
              title="Painel Analítico"
              detail="Dashboard com KPIs, Relatórios, Estatísticas e Visão Global"
              disable
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
