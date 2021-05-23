import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

import { MovieCard } from './MovieCard';

interface ContentProps {
  genre: string,
  genreId: number
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({ genre, genreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then(response => {
      setMovies(response.data);
    });
  }, [genreId]);

  return (
    <main>
      <header>
        <span className="category">Categoria:<span> {genre}</span></span>
      </header>

      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  )

}
