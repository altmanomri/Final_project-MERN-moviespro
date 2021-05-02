import axios from 'axios'
import {useState} from 'react'
import {styles} from './components/styles/logInStyle'
import './components/styles/styles.css'
function LogInComp(props) {

  
function logIn(e){
  // logIn authentication and saving users data in storage 
  e.preventDefault();
  let request = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  }
  axios.post('http://localhost:8000/api/users/login', request)
  .then(resp => {
    if(typeof(resp.data)=="string")
    {
      alert(resp.data)
    }
    else if(resp.data?.isLoggedIn){
      props.saveInStorage("true")
      sessionStorage.setItem('user', JSON.stringify(resp.data?.fullName))
      //alert("you are logged in");
      props.changeLogFlag();
    }
  })}

  return (
    <div className="body" >
      <div className="box">
      <div className="logH">Log In</div>
      <form onSubmit={(e) => logIn(e)} >
        <div className="detailsRow">
          <div>
            <p className="text">UserName:</p>
            <p className="text">Password:</p>
          </div>
          <div>
            <p><input type="text" name="username" id="username"/></p>
            <p><input type="text" name="password" id="password"/></p>
          </div>

        </div>
      <button type="submit" >Log in</button>
      </form>
      </div>
    
    </div>
  );
}

export default LogInComp;
