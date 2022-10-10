import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";
//import styled from 'styled-components';

/*const FormControl = styled.div`

  margin: 0.5rem 0;


& label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => (props.invalid ? 'red' : 'black')};
}

& input {
  display: block;
  width: 100%;
  border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
  background: ${props => (props.invalid ? '#ffd7d7' : 'transparent')};
  font: inherit;
  line-height: 1.5rem;
  padding: 0 0.25rem;
}

& input:focus {
  outline: none;
  background: #fad0ec;
  border-color: #8b005d;
}
`;*/

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    if(event.target.value.trim().length > 0) {
      setIsValid(true);
    } // Így is meg lehet oldani, de szerintem az én verzióm egyszerűbb egy kicsivel lejjeb (setIsValid(true);) Fontos!!Lejjebb nézd meg, ahol a saját ötletem van.
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // Ellenőrzöm, hogy a szövegmező üres-e, a "trim()" pedig azt csinálja, hogy kivágja az elejéről és a végéről is a felesleges fehér teret. Tehát ha csak szóközöket nyom le a felhasználó akkor a beviteli mező ugyanúgy üres lesz. Szóval, ha a feltétel igaz (üres a beviteli mező), akkor csak szimplán visszatér és nem csinál semmit, ha meg nem igaz akkor lefut az "onAddGoal" függvény.
    if (enteredValue.trim().length === 0) {
      return setIsValid(false);
    }
    props.onAddGoal(enteredValue);
    //setIsValid(true); Ez is jól működik csak annyival rosszabb a másiknál, hogy csak akkor vált vissza eredeti színre, ha rányomok a gombra (onAddGoal, látszik is, mert ez a gomb megnyomásakor fut le), a másiknál meg már akkor is, ha elkezdek gépelni az inputba. 
  };

  // A "backtick" (``) közé dinamikus értéket is be lehet szúrni a karakterlánc mellé. A $ jellel lehet tartalmat adni a karakterlánchoz. Ha az "isValid" nem igaz(false) akkor beszúrom az "invalid" karakterláncot a "form-control" mellé, ha pedig igaz akkor meg csak egy üres karakterláncot("")
  //<div className={`form-control ${!isValid ? "invalid": ""}`}></div>
  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
