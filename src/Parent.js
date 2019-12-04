import React from "react";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import _reject from "lodash/reject";
import _isEmpty from "lodash/isEmpty";
import MaterialTable from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "./App.css";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const columns = [
  { field: "course", title: "Subject" },
  { field: "credit", title: "Credits" },
  {
    field: "grade",
    title: "Grades"
  }
];

export default class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCounter: [],
      totalGpa: 0,
      alertOpen: false
    };
  }

  handleSubmit = val => {
    this.setState({
      subjectCounter: [...this.state.subjectCounter, val]
    });
  };
  handleFullSubmit = () => {
    this.setState(prevState => {
      const { subjectCounter } = prevState;
      const totalCreditScore = subjectCounter.reduce((accum, item) => {
        return accum + item.totalcredit;
      }, 0);
      const totalCredits = subjectCounter.reduce((accum, item) => {
        return accum + item.credit;
      }, 0);
      return { totalGpa: totalCreditScore / totalCredits, alertOpen: true };
    });
  };
  onDeleteItem = m => {
    this.setState(prevState => {
      const subjectCounter = _reject(prevState.subjectCounter, function(item) {
        return item === m;
      });

      return {
        ...prevState,
        subjectCounter: subjectCounter
      };
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
        {/* <div className="div-scroll">
          <List dense>
            <p>Grades received:</p>
            {this.state.subjectCounter.map(m => (
              <StyledList button className="Background-Button">
                <ListItemText
                  primary={`Credits = ${JSON.stringify(
                    m.credit
                  )} Grades = ${JSON.stringify(m.grade)}`}
                />
                <ListItemSecondaryAction>
                  <button
                    style={{ float: "right" }}
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => this.onDeleteItem(m)}
                  >
                    x
                  </button>
                </ListItemSecondaryAction>
              </StyledList>
            ))}
          </List>
        </div> */}
        <div className={_isEmpty(this.state.subjectCounter) ? 'hidden' : ''}>
        <MaterialTable
          title="Subjects/Courses"
          columns={columns}
          data={this.state.subjectCounter}
          options={{ search: false, sorting: false, paging: false }}
          editable={{
            onRowDelete: oldData =>
              Promise.resolve(
                this.setState(prevState => {
                  const data = [...prevState.subjectCounter];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, subjectCounter: data };
                })
              )
          }}
        />
        </div>
        <Form onSubmit={this.handleSubmit} />

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleFullSubmit}
          >
            Click For Overall GPA
          </Button>
          <Dialog
            open={this.state.alertOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleAlertClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Overall GPA"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Your Overall GPA : {this.state.totalGpa}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}
