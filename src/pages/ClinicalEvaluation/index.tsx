import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '../../components/AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(5),
    },
  }),
);

const ClinicalEvaluation: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar titlePage="Avaliação Clínica" />
      <div className={classes.content}>
        <h3>Avaliação Clínica</h3>
        pagina de Avaliação Clínica
      </div>
    </>
  );
};

export default ClinicalEvaluation;
