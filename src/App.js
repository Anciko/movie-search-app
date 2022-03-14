import { useEffect, useState } from "react";

import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=9a760caf';


// const movie1 = {
//     "Title": "Spiderman and Grandma",
//     "Year": "2009",
//     "imdbID": "tt1433184",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg"
// }


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
        console.log(data.Search);
    }

    useEffect(() => {
        searchMovie('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value) }
                />
                <img src={SearchIcon} alt="Search" onClick={() => searchMovie(searchTerm) } />
            </div>

            {
                movies.length > 0
                    ? (
                        <div className="container">
                            {
                                movies.map((movie) => 
                                    (
                                        <MovieCard  movie={movie} />
                                    )    
                                )
                            }
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found!</h2>
                        </div>
                    )
            }
           


        </div>
    )
}

export default App;