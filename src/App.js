import './App.css';
import {useState, useEffect} from 'react';
import ExactMovie from './components/search'
import NoPoster from './components/img111.png'

function App() {
  const [posts, setpost] = useState([])
  const [title, settitle] = useState('')

  const [poststatus, setpoststatus] = useState(false)
  const [selectedpost, setselectedpost] = useState({})
  const [selectedpoststatus, setselectedpoststatus] = useState(false)

  const [fav, setfav] = useState([]) 
  const [favstatus, setfavstatus] = useState(true)
  const Addfav = async (id) => {
    if (favstatus){ 
      try{ 
        const res = await fetch(`https:www.omdbapi.com/?i=${id}&apikey=7f5ba90f`, {
          method: 'GET',
          mode:'cors',
          cache:'no-cache',
          headers: { 
            'Content-Type': 'multipart/form-data'
          },
        })
        const data = await res.json()
        console.log(data)
        setfav([...fav, data]) 
        setfavstatus(false) 
      }catch(e){
        console.log(e)
      }
    }else{
      const newfav = fav.filter((item) => item.imdbID !== id) 
      setfavstatus(true)
      setfav(newfav)
      console.log(false, newfav, fav)
    }
  }

  const Data = async (title) => {
    try{  
      const res = await fetch(`https:www.omdbapi.com/?s=${title}&apikey=7f5ba90f`, {
        method: 'GET',
        mode:'cors',
        cache:'no-cache',
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
      })
      const data = await res.json()
      console.log(data)
      if (data.Search){
        setpost(data.Search) 
        setpoststatus(true)
        setselectedpoststatus(false)
      }
    }catch(e){
      console.log(e)
    }
  } 

  useEffect (() =>{
    if (title.length !== 0){
      Data(title);
      console.log(title, title.length)
    }
  }, [title]) 

  // const OnSearch =() =>{
  //   if (title.length === 0){
  //     Data('jersey') 
  //   }
  // }

  const show = async (id) => {
    try{ 
      const res = await fetch(`https:www.omdbapi.com/?i=${id}&apikey=7f5ba90f`, {
        method: 'GET',
        mode:'cors',
        cache:'no-cache',
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
      })
      const data = await res.json()
      console.log(data)
      setselectedpost(data) 
      settitle('')
      setselectedpoststatus(true)
      setpoststatus(false)

      const ids = fav.filter((item) => item.imdbID === id) 
      if (ids.length === 0){
        setfavstatus(true)
      }else{
        setfavstatus(false)
      }
      
    }catch(e){
      console.log(e)
    }
  }

  const OnClickFavourites =() =>{
    setpoststatus(false) 
    setselectedpoststatus(false)
  }
  const OnClickMovies = () =>{
    setpoststatus(true)
    setselectedpoststatus(false)
  }

  return (
    <div>
    <div className="Apps"> 
      <div className="moviecontainer">
        <div className="FavouritesMovie">
          <h2 onClick={() => OnClickMovies()}>Movies</h2>
        </div>
        <div className="FavouritesMovie">
          <h2 onClick={() => OnClickFavourites()}>Favourites</h2>
        </div>
        {/* onClick={() => OnSearch()} */}
        <div className="movieinputs" >
          <input type="text" value={title} onChange={e => {settitle(e.target.value)}} placeholder="Search"></input>
          {/* <button onClick={() => exacttitle(title)}>Serach</button> */}
        </div>
      </div>
      {poststatus  && posts.map(function(post, index){
          return (
          <div className="searchmovie" key={post.imdbID}> 
            <div className="setimg">
              {post.Poster !== "N/A" && <img src={post.Poster} alt="NoImage" onClick={() => show(post.imdbID) } className="searchmovieimage"></img>}
              {post.Poster === "N/A" && <img src={NoPoster} alt="NoImage" onClick={() => show(post.imdbID) } className="searchmovieimage"></img>}
            </div>
              <p>{post.Title}</p>
          </div>
          )})
          }
      { selectedpoststatus && <ExactMovie  selectedpost={selectedpost} favmovie={Addfav} favstatus={favstatus}/>} 
    </div>
    <div className="Favmovieclass"> <h1>Favourites</h1> </div>
    {fav.length === 0 &&  <div className="NoFavmovieclass"> <h3>No Favourites List</h3> </div>}
    {fav.length !== 0 && fav.map(function(favmov, index){
           return (
             <div className="favmovielist">
              {favmov.Poster !== 'N/A' && <img src={favmov.Poster} alt="NoImage" className="favmovieimage" onClick={() => show(favmov.imdbID) }></img>}
              {favmov.Poster === 'N/A' && <img src={NoPoster} alt="NoImage" className="favmovieimage" onClick={() => show(favmov.imdbID) }></img>}
              <p>{favmov.Title}</p>
             </div>
           )})}
    </div>
  );
}

export default App;
