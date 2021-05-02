import { useState, useEffect } from "react";
import utils from "./MoviesUtilsComp";
import { Link } from "react-router-dom";
import CardItemComp from "./CardItemComp";
import subUtils from "./components/subscriptions/SubscriptionsUtilsComp";
import membersUtils from "./components/members/MembersUtilsComp";
import {styles} from './components/styles/headerStyles';

function AllMoviesComp(props) {
  const [data,setData]= useState({
    movies:[],
    copies:[],
    allSubs:[],
    allMembers:[]
  })
  const [movies, setMovies] = useState([]);
  const [copies, setCopies] = useState([]);
  const [searchContent, setSearchContent] = useState([]);
  const [subs, setSubs] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(async () => {
    let resp = await utils.getMovies();
    let respSub = await subUtils.getSubscriptions();
    let respMem = await membersUtils.getMembers();
    setSubs(respSub.data);
    setMovies(resp.data);
    setCopies(resp.data);
    setMembers(respMem.data);
  }, []);

  useEffect(() => {
    if (copies) {
      let filteredMovies = copies.filter((m) =>
        m.name.toLowerCase().includes(searchContent)
      );
      filteredMovies && setMovies(filteredMovies);
    }
  }, [searchContent]);
// show dynamic movie components  
  const renderCards = (moviesList = []) => {
    if (moviesList) {
      return moviesList.map((movie, i) => (
        <CardItemComp
          key={i}
          movie={movie}
          subs={subs}
          members={members}
          movies={movies}
        />
      ));
    }
  };
  return (
    <div>
      <div>
        <Link to="/AllMembers"><p style={styles.pageHeader}>Go to Members</p></Link>
        <div style={styles.topPageHeader}>
                    <h1 style={styles.topPageHeaderText}>List of Movies:</h1>
                </div>
       <span style={styles.serach.header}>SEARCH 🕵️‍♂️{" "}</span> 
        <input
          type="text"
          placeholder="Enter movie name"
          onChange={(e) => setSearchContent(e.target.value)}
          style={styles.serach.input}
        ></input>
        <Link to="/AddMovie">
          <button style={styles.addBtn} type="button">Add movie</button>
        </Link>
       
        {renderCards(movies)}
      </div>
    </div>
  );
}

export default AllMoviesComp;
