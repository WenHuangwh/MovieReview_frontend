import React, { useState, useEffect, useCallback } from "react";
import MovieDataService from '../services/movies';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import moment from 'moment';
import FavoritesDataService from "../services/favorites";

const MyFavorites = ({user}) => {

    const [favorites, setFavorites] = useState([]);
    const [doSaveFaves, setDoSaveFaves] = useState(false);

    const retrieveFavorites = useCallback(() => {
        FavoritesDataService.getAll(user.googleId)
        .then(response => {
          setFavorites(response.data.favorites);
        })
        .catch(e => {
          console.log(e);
        });
      }, [user]);
    
      const saveFavorites = useCallback(() => {
        var data = {
          _id: user.googleId,
          favorites: favorites
        }
    
        FavoritesDataService.updateFavorites(data)
        .catch(e => {
          console.log(e);
        })
      }, [favorites, user]);
    
      useEffect(() => {
        if (user && doSaveFaves) {
          saveFavorites();
          setDoSaveFaves(false);
        }
      }, [user, favorites, saveFavorites, doSaveFaves]);
    
      useEffect(() => {
        if (user) {
          retrieveFavorites();
        }
      }, [user, retrieveFavorites]);

    return (
        <div>
            place holder for my favorites
            {console.log(favorites)}
            {favorites.map((movie) => {
                        return(
                            <Col key={movie._id}>
                                <Card className="moviesListCard">
                                    <Card.Img
                                    className="smallPoster"
                                    src={movie.poster+"/100px180"} 
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src="/images/NoPosterAvailable-crop.jpg";
                                        currentTarget.style="width: 100%; height: 180";
                                      }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>
                                            {movie.plot}
                                        </Card.Text>
                                        <Link to={"/movies/"+movie._id}>
                                            View Reviews
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
        </div>
    )
}

export default MyFavorites;