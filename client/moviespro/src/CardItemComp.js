import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { Button, CardActions, CardContent } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import utils from "./MoviesUtilsComp";
import AddSubscriptionComp from "./components/subscriptions/AddSubscriptionComp";
import { styles } from './components/styles/cardStyle'
import './components/styles/styles.css'

export default function CardItemComp(props) {
  let item = props.movie;
  const members = props.members;
  const typeSubMovies = true;
  const movies = props.movies;
  const cardMovie = props.movie;
  const subs = props.subs;
  const [mySubs, setMySubs] = useState();
  const [showAddContent, setShowAddContent] = useState(false);

  const DeleteMovie = (id) => {
    utils.deleteMovie(id);
    window.location.reload();
  };
  const findMemberById = (id) => {
    let AMember = members.find((member) => member._id == id);
    return AMember?.full_name;
  };
  // find subscriptions for a specific movie by movie id
  const findSubsToMovie = async (movieId) => {
    let SubsWithThisMovie = subs?.filter(
      (sub) => sub?.movieId?.indexOf(movieId) !== -1
    );
    return SubsWithThisMovie;
  };
  // show date in a short format
  const getTime = (date) => {
    let shortDate = new Date(date);
    return shortDate.toLocaleDateString();
  };

  useEffect(async () => {
    let oneSub = await findSubsToMovie(item._id);
    oneSub && setMySubs(oneSub);
  }, []);
  // get users for subscription display as each one is a link
  const renderMembersList = (list = []) => {
    if (list?.length > 0) {
      return list.map((sub) => {
        return (
          <Link key={sub?._id} to={"/EditMember/" + sub?.memberId}>
            <li>
              {findMemberById(sub?.memberId)}
              <span style={{ marginLeft: 10 }}>{getTime(sub.date)}</span>
            </li>
          </Link>
        );
      });
    } else {
      return <div>No subscriptions found</div>;
    }
  };

  return (
    <div style={styles.cardBox} item key={item._id}>
      <Card movie={item} >
        <CardContent>
          <h3>
            {item.name}, {item.yearPremiered}
          </h3>
          <img src={item.image} width="200px" height="250px"></img>
          <img style={styles.movieLogo.styles} src={styles.movieLogo.uri} />

          <p className="genres">Genres:</p>
          <ul>
            {item.genres.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          {/* sub watched list */}
          <div style={{ border: "solid", width: "70%" }}>
            <h4 className="subsWatch">Subscriptions Watched</h4>
            <ul>{renderMembersList(mySubs)}</ul>
             {/* if clicked show add new sub comp */}
            <button
              className="subBtn"
              onClick={() => setShowAddContent(!showAddContent)}
              type="button" >
              Add new sub
            </button>
            <div style={{ display: showAddContent ? "inline" : "none" }}>
              <AddSubscriptionComp
                typeSubMovies={typeSubMovies}
                showAddContent={showAddContent}
                mySubs={mySubs}
                movies={movies}
                member={mySubs?.memberId}
                allMembers={members}
                cardMovie={cardMovie}
                subs={subs}
              />
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Link to={"/EditMovie/" + item._id}>
            <Button size="small" color="primary" startIcon={<EditIcon />}>
              Edit
            </Button>
          </Link>
          <Button
            size="small"
            color="primary"
            onClick={() => DeleteMovie(item._id)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
