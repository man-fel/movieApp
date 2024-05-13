"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

let MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

export default function Home() {
  const [movie, setMovie] = useState("Titanic");
  const [movieData, setmovieData] = useState<any>(null)
  const [loading, setLoading] = useState(false);

  const getMovieData = async ()=> {
    setLoading(true);
    if(movie && movie.length>0){
      try{
        let url = `https://www.omdbapi.com/?t=${movie}&apikey=${MOVIE_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log("GET MOVIE DATA ", data);
        setmovieData(data)
      }
      catch(err){}
      finally{
        setLoading(false)
      }
    }
  }
  useEffect(()=> {getMovieData()}, [])
  
  return (
    <div>
      <div className={styles.searchbar}>
        <input type="search" placeholder="Enter the movie title" onChange={(e)=> setMovie(e.target.value)} />
        <button onClick={getMovieData}><SearchIcon/></button>
      </div>
      {loading ? (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
  </div>
) : ( 
  movieData && (
    <div className={styles.container}>
      <div className={styles.poster}>
        {movieData.Poster && <img src={movieData.Poster} alt={movieData.Title} />}
      </div>
      <div className={styles.details}>
        <h1>{movieData.Title}</h1>
        <h2>Rating: {movieData.Rated}</h2>
        <div className={styles.space}>
          <p><em><strong>Plot:</strong></em> {movieData.Plot}</p>
          <p><em><strong>Released:</strong></em> {movieData.Released}</p>
          <p><em><strong>Cast:</strong></em> {movieData.Actors}</p>
          <p><em><strong>Awards:</strong></em> {movieData.Awards}</p>
          <p><em><strong>Watch Here: <OpenInNewIcon/> </strong></em></p>
        </div>
      </div>
    </div>
  )
)}

      
    </div>
  );
}
