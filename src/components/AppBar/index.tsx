import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
// material-ui
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// icones
import DashboardIcon from '@material-ui/icons/Dashboard';
import ClinicalEvaluationIcon from '@material-ui/icons/ChromeReaderMode';
import RaioxIcon from '@material-ui/icons/Tonality';
import TomografiaIcon from '@material-ui/icons/Toll';
import UltrassomIcon from '@material-ui/icons/TrackChanges';
import VisualizarIcon from '@material-ui/icons/ImageSearch';
import ConsultaGeralIcon from '@material-ui/icons/List';
import ConfiguracoesIcon from '@material-ui/icons/Settings';
import PainelAnaliticoIcon from '@material-ui/icons/Poll';
import SairIcon from '@material-ui/icons/ExitToApp';

interface AppBarProps {
  titlePage: string;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const AppBAr: React.FC<AppBarProps> = ({ titlePage }: AppBarProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {open ? titlePage : 'COVID-VISION'}
          </Typography>
          {auth && (
            <Box boxShadow={1}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                &nbsp; João Dantas
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openUserMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Meus Dados</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div>{open ? 'COVID-VISION' : titlePage}</div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="dashboard" component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboar" />
          </ListItem>
          <ListItem
            button
            key="clinicalEvaluation"
            component={Link}
            to="/ClinicalEvaluation"
          >
            <ListItemIcon>
              <ClinicalEvaluationIcon />
            </ListItemIcon>
            <ListItemText primary="Avaliação Clínica" />
          </ListItem>
          <Divider />
          <ListItem button key="raiox" component={Link} to="/RaioX">
            <ListItemIcon>
              <RaioxIcon />
            </ListItemIcon>
            <ListItemText primary="Raio-X" />
          </ListItem>
          <ListItem button key="tomografia">
            <ListItemIcon>
              <TomografiaIcon />
            </ListItemIcon>
            <ListItemText primary="Tomografia" />
          </ListItem>
          <ListItem button key="ultrassom">
            <ListItemIcon>
              <UltrassomIcon />
            </ListItemIcon>
            <ListItemText primary="Ultrassom" />
          </ListItem>
          <Divider />
          <ListItem button key="visualizar">
            <ListItemIcon>
              <VisualizarIcon />
            </ListItemIcon>
            <ListItemText primary="Visualizar" />
          </ListItem>
          <ListItem button key="consultaGeral">
            <ListItemIcon>
              <ConsultaGeralIcon />
            </ListItemIcon>
            <ListItemText primary="Consulta Geral" />
          </ListItem>
          <ListItem button key="configuracoes">
            <ListItemIcon>
              <ConfiguracoesIcon />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItem>
          <ListItem button key="painelAnalitico">
            <ListItemIcon>
              <PainelAnaliticoIcon />
            </ListItemIcon>
            <ListItemText primary="Painel Analítico" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="sair" component={Link} to="/auth">
            <ListItemIcon>
              <SairIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default AppBAr;
