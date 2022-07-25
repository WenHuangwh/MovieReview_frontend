import React, { useState, useEffect, useCallback } from "react";
import { render } from 'react-dom';
// import Example from './example';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './Container.js'


const MyFavorites = ({ user }) => {

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Container
                user = {user}
                />
            </DndProvider>
        </div>
    )
}

export default MyFavorites;