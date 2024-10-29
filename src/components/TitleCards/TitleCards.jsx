import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'




const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState ([]);

    const cardsRef = useRef();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmExYTg5MjM4NTQ4ZDA2OWEyNmM5OGU2ZmZmYWE0NSIsIm5iZiI6MTczMDA0Mzg3NS4wODY1NDksInN1YiI6IjY3MWU1ZTA0YTRhYzhhNDMyYzVjYWEyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k1s5wQmP3PwMKAECKUGn7AVznTQGGsWI0j4WZastJlY'
      }
    };


const handlewheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;  
}
useEffect(()=>{
      
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing" }?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handlewheel);

},[])

  return (
    <div className="title-cards">
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card, index)=>{
              return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={'https://image.tmdb.org/t/p/w500'+card.poster_path} alt="" />
                <p>{card.original_title}</p>
              </Link>
            })}
        </div>
    </div>
  )
}

export default TitleCards