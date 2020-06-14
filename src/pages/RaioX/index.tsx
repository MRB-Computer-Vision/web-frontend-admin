import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '../../components/AppBar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(5),
    },
    tabs: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const RaioX: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <AppBar titlePage="Raio-X" />
      <div className={classes.content}>
        <div className={classes.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Ficha de Anamnese" {...a11yProps(0)} />
            <Tab label="Exames auxiliares" {...a11yProps(1)} />
            <Tab label="Ultrassonagrafias" {...a11yProps(2)} />
            <Tab label="Radiografias" {...a11yProps(3)} />
            <Tab label="Tomografias" {...a11yProps(4)} />
            <Tab label="Parecer final" {...a11yProps(5)} />
            <Tab label="Acompanhamento" {...a11yProps(6)} />
            <Tab label="Desfecho" {...a11yProps(7)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <h3>Raio-X</h3>
            pagina de raio-x
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={7}>
            Item Three
          </TabPanel>
        </div>
      </div>
    </>
  );
};

export default RaioX;
