import React, { useState, useEffect, useCallback } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './Container.js'
import Card from 'react-bootstrap/Card';
import "./MyFavorites.css";

const MyFavorites = ({ user }) => {

    return (
        <div >
            <div className="favTitle"><h2 >Drag your favorites to rank them</h2></div>
            <div className="fav">
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