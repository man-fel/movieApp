"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

let MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY

export default function Home() {
  const [movie, setMovie] = useState("Titanic");
  const [movieData, setmovieData] = useState<any>(null)

  const getMovieData = async ()=> {
    if(movie && movie.length>0){
      try{
        let url = `https://www.omdbapi.com/?t=${movie}&apikey=${MOVIE_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log("GET MOVIE DATA ", data);
        setmovieData(data)
      }
      catch(err){}
    }
  }
  useEffect(()=> {getMovieData()}, [])
  
  return (
   <div>
    <div className={styles.serachbar}>
      <input type="search" placeholder="Movie name" />
      <button onClick={getMovieData}><SearchIcon/></button>
      </div>
   </div>
      {movieData && (
          <div>
            <h2>movieData.Title</h2>
            <p>movieData.Plot</p>
            <img src={movieData.poster} alt={movieData.title} />
          </div>
        )
      }
  );
}
