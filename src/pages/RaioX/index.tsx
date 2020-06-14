import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import AppBar from '../../components/AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(5),
    },
  }),
);

const RaioX: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar titlePage="Raio-X" />
      <div className={classes.content}>
        <h3>Raio-X</h3>
        pagina de raio-x
      </div>
    </>
  );
};

export default RaioX;
