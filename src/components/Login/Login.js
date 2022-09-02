import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//We decided to store this fxn outside of our useReducer 
const emailReducer = (state, action) => {

  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR'){
    return{ value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false}
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT'){ //event.target.value.trim().length > 6
    return {value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR'){

    return{ value: state.value, isValid: state.value.trim().length > 6 };
  }
  return {value: '', isValid: false}
}

const Login = (props) => {
/*   const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
/*   const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);
  /*Here's the syntax just for reference
  const[state,dispatchFn] = useReducer(reducerFn, initialState, initFn);*/
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null, }); 
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null, }); 
    
  const {isValid: emailIsValid } = emailState;
  const {isValid: passwordIsValid } = passwordState;

  useEffect(() => {    
    const indentifier = setTimeout(() => {
      console.log('Checking Form Validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
  }, 500); //500 tells code to wait before executing the fxn before it  

    return () => {
      clearTimeout(indentifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.trim().length > 6 );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
