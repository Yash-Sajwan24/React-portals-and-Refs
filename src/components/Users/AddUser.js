import React, { useState, useRef } from 'react';
//instead of useState we can also use useRef to make much shorter code
//mostly it is used when you just want to extract the value and not change it
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [error, setError] = useState();

  const enterName = useRef();
  const enterAge = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = enterName.current.value;
    const enteredAge = enterAge.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    //it is not advised to change the value of refs 
    enterName.current.value = '';
    enterAge.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={enterName}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={enterAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
