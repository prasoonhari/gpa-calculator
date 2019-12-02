import React from "react";
import Input from "./components/Input";
import _isNumber from "lodash/isNumber";
import _isFinite from "lodash/isFinite";
import Select from "./components/Select";
import { CONVERT } from "./constants/gpaConverter";
import _get from "lodash/get";
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";
import "./App.css";

const styles = {
  backgroundColor: "lightgray",
  color:"black"
};


export default class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createInitialState();
  }

  createInitialState = () => {
    return {
      subject: {
        credit: "",
        grade: "",
        totalcredit: ""
      }
    };
  };

  reset = () => {
    this.setState(this.createInitialState());
  };

  handleCredit = e => {
    let value = e.target.value;
    this.setState(
      prevState => ({
        subject: {
          ...prevState.subject,
          credit: Number.parseFloat(value)
        }
      }),
      () => console.log(this.state.subject)
    );
  };
  setTotalCredit = () => {
    if (
      _isFinite(Number.parseInt(this.state.subject.credit)) &&
      _isFinite(Number.parseInt(_get(CONVERT, this.state.subject.grade, "")))
    ) {
      this.setState(
        prevState => {
          return {
            subject: {
              ...prevState.subject,
              totalcredit:
                _get(CONVERT, this.state.subject.grade, "") *
                this.state.subject.credit
            }
          };
        },
        () => {
          console.log(this.state.subject);
          this.props.onSubmit(this.state.subject);
          this.reset();
        }
      );
    } else {
      alert("Values not given");
    }
  };
  handleGrade = e => {
    let value = e.target.value;
    this.setState(
      prevState => ({
        subject: {
          ...prevState.subject,
          grade: value
        }
      }),
      () => console.log(this.state.subject)
    );
  };
  //   handleFormSubmit(e) {
  //     e.preventDefault();
  //     let userData = this.state.newUser;

  //     fetch("http://example.com", {
  //       method: "POST",
  //       body: JSON.stringify(userData),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       }
  //     }).then(response => {
  //       response.json().then(data => {
  //         console.log("Successful" + data);
  //       });
  //     });
  //   }
  render() {
    return (
      <div style={styles}>
        <div id="my-form" onSubmit={this.handleFormSubmit} className="Form-row">
          <Input
            inputType={"number"}
            title={"Credit"}
            name={"Credit"}
            value={this.state.subject.credit}
            placeholder={"Enter credit"}
            handleChange={this.handleCredit}
          />
          <InputLabel for="Grade">Grade</InputLabel>
          <select
            id="Grade"
            name="Grade"
            onChange={this.handleGrade}
            value={this.state.subject.grade}
          >
            <option value="" disabled>
              Please select Grades
            </option>
            {Object.keys(CONVERT).map(option => {
              return (
                <option key={option} value={option} label={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <div className="Add-Padding">
          <Button variant="contained" onClick={this.setTotalCredit}>
            Add Grades
          </Button>
          </div>
        </div>
      </div>     
    );
  }
}
