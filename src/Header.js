import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Logo from "./assets/icon.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const ForClasses = ({ children }) => {
  const classes = useStyles();
  return children(classes);
};
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertOpen: false
    };
  }

  handleHowToUse = () => {
    this.setState(prevState => {
      return { alertOpen: true };
    });
  };

  handleAlertClose = () => {
    this.setState(prevState => {
      return {
        alertOpen: false
      };
    });
  };
  render() {
    return (
      <div>
        <ForClasses>
          {classes => (
            <div className={classes.root}>
              <AppBar position="Fixed">
                <Toolbar>
                  <IconButton
                    edge="start"
                    size = "small"
                    color="inherit"
                    aria-label="menu"
                  ><a href="https://www.22bate7.com/">
                  <img width= {40} src={Logo} alt="website logo" /></a>
                  </IconButton>
                  <Typography variant="h6" className={classes.title} align="left">
                             GPA Calculator
                  </Typography>
                  <Button color="inherit" onClick={this.handleHowToUse}>
                    How to use it!
                  </Button>
                </Toolbar>
              </AppBar>
            </div>
          )}
        </ForClasses>

        <Dialog
          open={this.state.alertOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleAlertClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"How To use"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <p>Enter the grades (Scaled on 10) and credits for all the subjects or courses you have taken during the course of 
              your undergraduate.</p>
              <p>This is a CGPA to GPA Calculator that changes the CGPA based on the scale of 10 to the conventional
              GPA i.e of the scale 4.</p>
              Even if you got your score in percentage, put the closest scaled Value (For eg. for percentage between
              75 and 85, choose 8)
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
