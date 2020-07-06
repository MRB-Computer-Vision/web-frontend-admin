import React, { useState, FormEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useAuth } from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props: AlertProps): any {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface State extends SnackbarOrigin {
  open: boolean;
}

const SigIn: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [severitySuccess, setSeveritySuccess] = useState(true);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const { signIn } = useAuth();

  async function handleAuth(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    // error, warning, info, success
    if (!email || !password) {
      setMessage('Email and Password requireds');
      setSeveritySuccess(false);
    } else {
      const params = { email, password };
      try {
        const response = await signIn(params);
        setMessage(response.message);
        setSeveritySuccess(true);
      } catch (err) {
        console.log('erro', err);
        setMessage('Falha na autenticacao');
        setSeveritySuccess(false);
      } finally {
        setState({ open: true, vertical: 'top', horizontal: 'center' });
      }
    }
  }
  /*
  function handleClick(newState: SnackbarOrigin): void {
    setState({ open: true, ...newState });
  }
  */
  const handleClose = (): void => {
    setState({ ...state, open: false });
  };

  function Copyright(): any {
    return (
      <>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Movimento Respira Brasil
          </Link>
          {`${new Date().getFullYear()}.`}
        </Typography>
      </>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VisibilityIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Covid Vision
        </Typography>
        <form className={classes.form} onSubmit={handleAuth}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar meus dados"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Acessar
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
          >
            <Alert
              onClose={handleClose}
              severity={severitySuccess ? 'success' : 'error'}
            >
              {message}
            </Alert>
          </Snackbar>
          <Grid container>
            <Grid item xs>
              <Link href="http://localhost:3000/forgot" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sigup" variant="body2">
                Não possui uma conta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SigIn;
