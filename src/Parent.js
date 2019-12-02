import React from "react";
import Button from '@material-ui/core/Button';
import Form from "./Form";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = {
  backgroundColor: "#cef",
  padding: 10,
};

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
  
  render() {
    return (
      <div style={styles}>
        <p>Subject received:</p>
      
          {this.state.subjectCounter.map(m => (
            <ListItem button>
              <ListItemText primary={JSON.stringify(m)} />
              <ListItemSecondaryAction>
              <button style={{float:'right'}} type="button" className="btn btn-danger btn-sm" onClick={this.onDeleteItem}>x</button>
            </ListItemSecondaryAction>
                </ListItem>
            
          ))} 
        <Form onSubmit={this.handleSubmit} />
        <div>
          <Button variant="contained" type="button" onClick={this.handleFullSubmit}>
            Click me
          </Button>
          <p>your gpa:{this.state.totalGpa}</p>
        </div>
      </div>
    );
  }
}
