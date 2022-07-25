import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MovieDataService from '../services/movies';
import React, { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
// import "./PosterCard.css"

const ItemTypes = {
  Poster: 'poster',
}

const cardStyle = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const posterStyle = {
  height: '8rem', 
  width: '18rem'
}

export const PosterCard = ({ id, index, moveCard }) => {
  const [movie, setMovie] = useState("");
  const getMovie = id => {
    // Todo:
    // Implement getMovie
    MovieDataService.getMovieById(id)
        .then(response => {
            setMovie(response.data);
    })
    .catch(e => {
        console.log(e);
    })
}
  const title = movie.title;
  const img = movie.poster;

  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.Poster,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Poster,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div className='posteCard' ref={ref} style={{ ...cardStyle, opacity }} data-handler-id={handlerId}>
      {getMovie(id)}
        <Card className="posterImg" style={{ posterStyle }} >
        <Badge pill bg="warning">
        {index}
      </Badge>{' '}
          <Card.Img
            variant="left"
            src={img + "/100px180"}
            height='100%'
            width='20%'
            title={title}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/images/NoPosterAvailable-crop.jpg";
              currentTarget.style = "width: 20%; height: 100%";
            }}
          />
        </Card>
        <Card.Title>
          {title}
        </Card.Title>
    </div>
  )
}
