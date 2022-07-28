import update from 'immutability-helper'
import { PosterCard } from './PosterCard.js'
import { useState, useEffect, useCallback } from "react";
import FavoritesDataService from "../services/favorites";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./MyFavorites.css";

const Container = (user) => {

    const [myFavorites, setMyFavorites] = useState([]);

    const getFavorite = useCallback(() => {
        if (!user) {
            return;
        }
        FavoritesDataService.getAll(user.user.googleId)
            .then(response => {
                const obj = response.data.favorites;
                const arr = [];
                for (let i = 0; i < obj.length; i++) {
                    arr.push({ id: obj[i] });
                }
                setMyFavorites(arr);
            })
            .catch(e => {
                console.log(e);
            })
    }, [user]);

    useEffect(() => {
        getFavorite();
    }, [getFavorite]);

    {
        const [posters, setPosters] = useState([]);

        useEffect(() => {
            setPosters(myFavorites);
        }, [myFavorites]);

        const movePoster = useCallback((dragIndex, hoverIndex) => {
            setPosters((prevCards) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex]],
                    ],
                }),
            )
        }, [])

        const updateFavorite = useCallback(() => {
            if (!user) {
                return;
            }
            const sortedMyfav = [];
            for (let i = 0; i < posters.length; i++){
                sortedMyfav.push(posters[i].id);
            }
            if (sortedMyfav.length === 0) {
                return;
            }
            console.log(sortedMyfav);
            const data = { _id: user.user.googleId, favorites: sortedMyfav };
            FavoritesDataService.updateFavorites(data)
                .then(response => {
                    console.log('Update favorites');
                })
                .catch(e => {
                    console.log(e);
                })
        }, [posters]);

        useEffect(() => {
            updateFavorite();
        }, [updateFavorite]);

        const renderPoster = useCallback((card, index) => {
            return (
                <PosterCard
                    key={card.id}
                    index={index}
                    id={card.id}
                    title={card.title}
                    img={card.img}
                    moveCard={movePoster}
                />
            )
        }, [])
        return (
            <>
                <div>{posters.map((card, i) => renderPoster(card, i))}</div>
            </>
        )
    }
}

export default Container;

