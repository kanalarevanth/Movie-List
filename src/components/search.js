import './search.css';
import NoPoster from './img111.png'
// import {useState, useEffect} from 'react';
function ExactMovie(props) {
  return (
    <div>
    <div className="ExactMoviecontainer">
        <div className="title_img">
         <h2>{props.selectedpost.Title}</h2>
         <div className="image2">  
           {props.selectedpost.Poster !== "N/A" && <img src={props.selectedpost.Poster} alt="NoImage"></img>}
           {props.selectedpost.Poster === "N/A" &&<img src={NoPoster} alt="NoImage"></img>}
         </div>
         </div>
         <div className="moviedetails">
           <p>Actors : {props.selectedpost.Actors}</p>
           <p>Director : {props.selectedpost.Director}</p>
           <p>Language : {props.selectedpost.Language}</p>
           <p>Genre : {props.selectedpost.Genre}</p>
           <p>Released : {props.selectedpost.Released}</p>
           <p>Plot : {props.selectedpost.Plot}</p>
           <p>Imdb rating : {props.selectedpost.imdbRating}</p> 
           <div>
           {props.favstatus && <button onClick ={() => props.favmovie(props.selectedpost.imdbID)} className="AddFavclass">Add to Favourite</button>}
           {!props.favstatus && <button onClick ={() => props.favmovie(props.selectedpost.imdbID) } className="AddFavclass">Remove from Favourite</button>}
         </div>
         </div>
         </div>
  </div>
  );
}

export default ExactMovie;
