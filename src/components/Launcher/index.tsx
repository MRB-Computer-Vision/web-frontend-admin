import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minHeight: 142,
  },
  link: {
    minHeight: 142,
  },
});

interface LauncherProps {
  title: string;
  detail: string;
  disable: boolean;
  to: any;
}

const Launcher: React.FC<LauncherProps> = ({
  title,
  detail,
  disable,
  to,
}: LauncherProps) => {
  const classes = useStyles();
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Card className={classes.root}>
        <CardActionArea disabled={disable}>
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {detail}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Launcher;
