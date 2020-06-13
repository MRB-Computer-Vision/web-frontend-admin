import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '../../components/AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const ClinicalEvaluation: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar titlePage="Avaliação Clínica" />
      <br />
      <br />
      <h3>Avaliação Clínica</h3>
      <div className={classes.root}>Conteúdo</div>
    </>
  );
};

export default ClinicalEvaluation;
