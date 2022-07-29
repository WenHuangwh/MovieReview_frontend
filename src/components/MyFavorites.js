import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './Container.js'
import "./MyFavorites.css";

const MyFavorites = ({ user }) => {

    return (
        <div className="myfavContainer container">
            <div className="myfavPanel">Drag your favorites to rank them</div>
            <div className='myfavCardContainer'>
            <DndProvider backend={HTML5Backend}>
                <Container
                user = {user}
                />
            </DndProvider>
            </div>
        </div>
    )
}

export default MyFavorites;