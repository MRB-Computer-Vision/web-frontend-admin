import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppBar from '../../components/AppBar';
import Launcher from '../../components/Launcher';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
  }),
);

const elements = [
  {
    to: 'clinical-evaluation',
    title: 'Avaliação Clínica',
    disable: false,
    detail:
      'Consultar, Alterar ou Incluir novos dados para avaliação do paciente',
  },
  {
    to: 'raio-x',
    title: 'Raio-X',
    detail: 'Solicitar laudo eletrônico para um exame',
    disable: false,
  },
  {
    to: '/',
    title: 'Tomografia',
    detail: 'Solicitar laudo eletrônico para um exame',
    disable: true,
  },
  {
    to: '/',
    title: 'Ultrassom',
    detail: 'Solicitar laudo eletrônico para um exame',
    disable: true,
  },
  {
    to: '/',
    title: 'Visualizar',
    detail:
      'Imagens, laudos e a situação das solicitações das últimas 48 horas',
    disable: true,
  },
  {
    to: '/',
    title: 'Consulta Geral',
    detail: 'Base de exames e laudos solicitados desta instituição',
    disable: true,
  },
  {
    to: '/',
    title: 'Configurações',
    detail: 'Cadastros, critérios, regras e parâmetros do sistema',
    disable: true,
  },
  {
    to: '/',
    title: 'Painel Analítico',
    detail: 'Dashboard com KPIs, Relatórios, Estatísticas e Visão Global',
    disable: true,
  },
];

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar titlePage="Dashboard" />
      <div className={classes.content}>
        <h3>Dashboard</h3>
        <Grid container spacing={1}>
          {elements.map((value, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={2} key={value.title}>
                <Launcher
                  to={value.to}
                  title={value.title}
                  detail={value.detail}
                  disable={value.disable}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
