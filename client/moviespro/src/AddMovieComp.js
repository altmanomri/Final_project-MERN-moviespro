import { useState, useEffect } from 'react'
import utils from './MoviesUtilsComp'
import { Link } from 'react-router-dom'
import AllMoviesComp from './AllMoviesComp'


function AddMovieComp(props) {

  const [movie, setMovie] = useState({
    name: "",
    image: "",
    genres: [],
    yearPremiered: ""
  })
  const [radioValue, setRadioValue] = useState({
    crime: "",
    Drama: "",
    sifi: "",
    horror: "",
    action: "",
    comedy: ""
  })

  const radioArray = [
    { id: 1, name: "crime" },
    { id: 2, name: "drama" },
    { id: 3, name: "sifi" },
    { id: 4, name: "horror" },
    { id: 5, name: "action" },
    { id: 6, name: "comedy" }
  ]

  const checkGenres = (array = []) => {
    array.map((genre) => {
      setRadioValue({ ...radioValue, [genre]: genre })
    })
  }
  // adding selected genre to genres
  const addGenres = (genre) => {
    let allGenres = movie.genres;
    // check if the new genre is NOT already in the movie genres array
    if (allGenres.indexOf(genre) == -1) {
      allGenres.push(genre);
      setMovie({ ...movie, genres: allGenres })
    }
    else {
      let filtered = allGenres.filter(gen => gen !== genre);
      setMovie({ ...movie, genres: filtered })
    }
  }

  const changeRadio = (name) => {
    if (radioValue[name] === name) {
      addGenres(name);
      setRadioValue({ ...radioValue, [name]: "" });
    }

    else {
      setRadioValue({ ...radioValue, [name]: name })
      addGenres(name)
    }
  }
  const cancelRadio = (name) => {
    if (radioValue[name] === name) {
      setRadioValue({ ...radioValue, [name]: "" });
      addGenres(name);
    }
  }

  const renderRadioInputs = (array = []) => {
    if (array) {
      return array.map((radio, index) => (
        <div key={index}>
          <input
            type="radio"
            name={radio.name}
            value={radio.name}
            checked={radioValue[radio.name] === radio.name}
            onChange={() => changeRadio(radio.name)}
            onClick={() => cancelRadio(radio.name)}
          />{radio.name}
        </div>
      ))
    }
  }

  const handleSubmit = async (movieObj) => {
    await utils.addMovie(movieObj);
    setMovie({
      name: "",
      image: "",
      genres: [],
      yearPremiered: ""
    })
  }

  return (
    <div>
      <Link to='/'>Back to movies list</Link>
      <div>
        <h2>Add Movie</h2>
          Name: <input value={movie.name} onChange={(e) => setMovie({ ...movie, name: e.target.value })} type="text" /><br />
          yearPremiered: <input value={movie.yearPremiered} onChange={(e) => setMovie({ ...movie, yearPremiered: e.target.value })} type="text" /><br />
          image: <input value={movie.image} onChange={(e) => setMovie({ ...movie, image: e.target.value })} type="text" /><br />
          genres: <input value={movie.genres} onChange={(e) => setMovie({ ...movie, image: e.target.value })} type="text" /><br />

        {renderRadioInputs(radioArray)}
        <br /><br />
        <button onClick={() => handleSubmit(movie)} >Submit</button>
        <Link to='/' ><button>Cancel</button></Link>
      </div>

    </div>
  );
}


export default AddMovieComp;
