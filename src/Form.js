import React from "react";
import Input from "./components/Input";
import _isNumber from "lodash/isNumber";
import _isFinite from "lodash/isFinite";
import Select from "@material-ui/core/Select";
import { CONVERT } from "./constants/gpaConverter";
import _get from "lodash/get";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import "./App.css";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const styles = {
  backgroundColor: "lightgray",
  color: "black"
};

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  }
}));

const ForClasses = ({ children }) => {
  const classes = useStyles();
  return children(classes);
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
        <ForClasses>
        {classes => (
          <form className={classes.root} noValidate autoComplete="off">
          <TextField label="Credit" variant="outlined"
            type={"number"}
            id={"Credit"}
            value={this.state.subject.credit}
            placeholder={"Enter credit"}
            onChange={this.handleCredit}
          />
          </form>
        )}
          </ForClasses>
          <ForClasses>
            {classes => (
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="Grade">Grade</InputLabel>
                <Select
                  labelId="Grade"
                  name="Grade"
                  labelWidth="56"
                  onChange={this.handleGrade}
                  value={this.state.subject.grade}
                >
                  <MenuItem value="" disabled>
                    Please select Grades
                  </MenuItem>
                  {Object.keys(CONVERT).map(option => {
                    return (
                      <MenuItem key={option} value={option} label={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </ForClasses>
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
