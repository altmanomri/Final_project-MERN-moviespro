import { useState, useEffect } from "react";
import LogInComp from "./LogInComp";
import { Switch, Route, Link } from "react-router-dom";
import AllMoviesComp from "./AllMoviesComp";
import AddMovieComp from "./AddMovieComp";
import EditMovieComp from "./EditMovieComp";
import AllMembersComp from "./components/members/AllMembersComp";
import EditMemberComp from "./components/members/EditMember";
import AddMemberComp from "./components/members/AddMember";
import AddSubscriptionComp from "./components/subscriptions/AddSubscriptionComp";
import { styles } from "./components/styles/headerStyles";

function MainPageComp(props) {
  let isMemberLoggedIn = getStatusFromStorage();
  const [logFlag, setLogFlag] = useState(
    isMemberLoggedIn == "true" ? false : true
  );

  const saveInStorage = (logStatus) => {
    localStorage.setItem("logStatus", logStatus);
  };
  function getStatusFromStorage() {
    let dataFromStorage = localStorage.getItem("logStatus");
    return dataFromStorage;
  }
  const logOut = () => {
    saveInStorage("false");
    window.location.reload();
  };
  const changeLogFlag = () => {
    setLogFlag(!logFlag);
  };
  const renderScreen = (boolean) => {
    if (boolean) {
      return (
        <LogInComp
          saveInStorage={saveInStorage}
          changeLogFlag={changeLogFlag}
        />
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={AllMoviesComp} />
          <Route path="/logIn" component={LogInComp} />
          <Route path="/AddMovie" component={AddMovieComp} />
          <Route path="/EditMovie/:movieId" component={EditMovieComp} />
          <Route path="/AllMembers" component={AllMembersComp} />
          <Route path="/EditMember/:memberId" component={EditMemberComp} />
          <Route path="/AddMember" component={AddMemberComp} />
          <Route path="/AddSubscription" component={AddSubscriptionComp} />
        </Switch>
      );
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.topHeader}>
        <button style={styles.logOutBtn} onClick={logOut}>
         <p>Log Out</p> 
        <img src="https://img.icons8.com/android/24/000000/logout-rounded-left.png" />
        </button>

        <h1>📽 Welcome to MoviesPro 🎬</h1>
        <h3> subscription website: {sessionStorage["user"]}</h3>
      </div>
      {renderScreen(logFlag)}
    </div>
  );
}

export default MainPageComp;
