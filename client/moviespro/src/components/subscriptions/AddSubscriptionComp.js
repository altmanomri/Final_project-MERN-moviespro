import { useEffect, useState } from "react";
import utils from "./SubscriptionsUtilsComp";

function AddSubscriptionComp(props) {
  const allMovies = props.movies;
  const member = props.member;
  const isMovieSub = props.typeSubMovies;
  const inputDisplayTag = isMovieSub ? "member" : "movie";
  const memberMovies = props.mySubs?.movieId || [];
  const memberId = member?._id;
  const cardMovie = props.cardMovie;
  const mySub = props.mySubs;
  const allMembers = props.allMembers;
  const allSubs = props.subs;
  const nowTime = new Date();

  if (props.showAddContent) {
  }
  const [newSub, setNewSub] = useState({
    name: "",
    date: nowTime.toLocaleDateString(),
  });
  const findMemberByName = (name) => {
    let memberByName = allMembers?.filter(
      (member) => member.full_name.toLowerCase() === name.toLowerCase()
    );
    return memberByName?.[0]?._id;
  };
  const findObjMovieByName = (name) => {
    let movieByName = allMovies?.filter(
      (movie) => movie.name.toLowerCase() === name.toLowerCase()
    );
    return movieByName?.[0]?._id;
  };
  const checkIfMovieOnList = (name) => {
    let isOnList = mySub?.movieId?.find(
      (movieId) => movieId === findObjMovieByName(name.toLowerCase())
    );
    return isOnList;
  };
  const checkIfMemberOnList = (name) => {
    let mySub = allSubs?.find(
      (member) => member.memberId === findMemberByName(name)
    );
    return mySub;
  };
  const handleSubmit = async (newSub) => {
    if (isMovieSub) {
      let newMember = findMemberByName(newSub.name);
      if (newMember === undefined) {
        alert("Member is already on the list");
        return;
      }
      let mySubscription = checkIfMemberOnList(newSub.name);

      if (mySubscription) {
        let objToServer = {
          memberId: newMember,
          movieId: mySubscription.movieId,
          date: newSub.date,
        };
        objToServer.movieId.push(cardMovie._id);
        let data = await utils.editSubscription(
          mySubscription._id,
          objToServer
        );
      } else {
        let objToServer = {
          memberId: newMember,
          movieId: memberMovies,
          date: newSub.date,
        };
        objToServer.movieId.push(cardMovie._id);
        let data = await utils.addSubscription(objToServer);
      }
    } else {
      let objToServer = {
        memberId,
        movieId: memberMovies,
        date: newSub.date,
      };
      let newMovie = await findObjMovieByName(newSub.name);
      if (newMovie === undefined) {
        alert("movie already on the list");
        return;
      }
      if (checkIfMovieOnList(newSub.name)) {
        alert("Movie is already on the list");
        return;
      }
      // if new subscription
      if (memberMovies?.length > 0) {
        objToServer.movieId.push(newMovie);
        let data = await utils.editSubscription(mySub?._id, objToServer);
      } else {
        objToServer.movieId.push(newMovie);
        let data = await utils.addSubscription(objToServer);
      }
    }
    window.location.reload();
  };
  const renderOption = (bool) => {
    if (bool) {
      return allMembers?.map((option) => (
        <option key={option?._id} value={option?.full_name}>
          {option?.full_name}
        </option>
      ));
    } else {
      return allMovies?.map((option) => (
        <option key={option?._id} value={option?.name}>
          {option?.name}
        </option>
      ));
    }
  };
  return (
    <div>
      <div>
        {inputDisplayTag} Name:{" "}
        <select
          onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
        >
          {renderOption(isMovieSub)}
        </select>
        <br />
        Date:{" "}
        <input
          type="text"
          value={newSub.date}
          onChange={(e) => setNewSub({ ...newSub, date: e.target.value })}
          required
        />
        <br />
        <button onClick={() => handleSubmit(newSub)}>Add</button>
      </div>
    </div>
  );
}

export default AddSubscriptionComp;
