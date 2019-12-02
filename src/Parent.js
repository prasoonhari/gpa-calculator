import React from "react";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import List from '@material-ui/core/List';
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import _reject from "lodash/reject";

const StyledList = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(ListItem);

export default class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCounter: [],
      totalGpa: ""
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
      return { totalGpa: totalCreditScore / totalCredits };
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

  render() {
    return (
      <div>
        <div className="div-scroll"> 
        
          <List dense>
          <p>Grades received:</p>
            {this.state.subjectCounter.map(m => (
              
              <StyledList button className="Background-Button">
                <ListItemText primary={`Credits = ${JSON.stringify(m.credit)} Grades = ${JSON.stringify(m.grade)}`} />
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
          </div>
        
        <Form onSubmit={this.handleSubmit} />
        <div className="Form-column-reverse">
          <Button
            variant="contained"
            type="button"
            onClick={this.handleFullSubmit}
          >
            Submit
          </Button>
          <p>Your Overall GPA :{this.state.totalGpa}</p>
        </div>
      </div>
    );
  }
}
