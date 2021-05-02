import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { Button, CardActions, CardContent } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import utils from "./MembersUtilsComp";
import AddSubscriptionComp from "../subscriptions/AddSubscriptionComp";
import { styles } from "../styles/cardStyle";
import '../styles/styles.css';

export default function CardMemberComp(props) {
  let item = props.member;
  const movies = props.movies;
  const subs = props.subs;
  const [mySubs, setMySubs] = useState();
  const subDate = new Date(mySubs?.date);
  var day = subDate?.getDate();
  var month = subDate?.getMonth();
  var year = subDate?.getFullYear();
  const dateDisplay = day + "-" + month + "-" + year;
  const [showAddContent, setShowAddContent] = useState(false);

  const findSubsToMember = async (memberId) => {
    let filter = await subs.filter((sub) => sub.memberId == memberId);
    if (filter) return filter;
    else return null;
  };
  const findMovieById = (id) => {
    let myMovie = movies.find((movie) => movie._id == id);
    return myMovie?.name;
  };
  useEffect(async () => {
    let oneSub = await findSubsToMember(item._id);
    oneSub[0] && setMySubs(oneSub[0]);
  }, []);
  // get movies for subscription display as each one is a link
  const renderMoviesList = (list = []) => {
    if (list?.length > 0) {
      return list.map((movieId, i) => (
        <Link key={i} to={"/EditMovie/" + movieId}>
          {" "}
          <li>
            {findMovieById(movieId)} {dateDisplay}
          </li>
        </Link>
      ));
    } else {
      return <div>No subscriptions found</div>;
    }
  };
  const addSubToMember = (newMovieId) => {
    let listOfMovies = mySubs.movieId;
    listOfMovies.push(newMovieId);
    setMySubs({ ...mySubs, movieId: listOfMovies });
  };
  // delete member func by clicking a button
  const DeleteMember = (id) => {
    utils.deleteMember(id);
    window.location.reload();
  };
  return (
    <div style={styles.cardBox} className={"cardbox"} item key={item?._id}>
      <Card member={item}>
        <CardContent>
          <h3>{item?.full_name}</h3>
          <img style={styles.userLogo.styles} src={styles.userLogo.uri} />
          <h3>Email: {item?.email}</h3>
          <h5>City: {item?.city}</h5>
        </CardContent>
        <CardActions>
          <Link to={"/EditMember/" + item?._id}>
            <Button size="small" color="primary" startIcon={<EditIcon />}>
              Edit
            </Button>
          </Link>
          <Button
            size="small"
            color="primary"
            onClick={() => DeleteMember(item?._id)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardActions>
        <div style={{ border: "solid", width: "80%" }}>
          {/* movie watched box */}
          <div>
            listOf movies:
            <div>
              <h4 className="subsWatch">Movies watched</h4>
              <ul>{renderMoviesList(mySubs?.movieId)}</ul>
            </div>
          </div>
          {/* add new sub movie box */}
          <button
            onClick={() => setShowAddContent(!showAddContent)}
            type="button"
            className="subBtn"
          >
            add new sub
          </button>
          {/* if clicked show add new sub comp */}
          <div style={{ display: showAddContent ? "inline" : "none" }}>
            <AddSubscriptionComp
              showAddContent={showAddContent}
              mySubs={mySubs}
              movies={movies}
              member={item}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
