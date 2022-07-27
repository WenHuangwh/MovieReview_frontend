import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MovieDataService from '../services/movies';
import React, { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import "./MyFavorites.css";

const ItemTypes = {
  Poster: 'poster',
}

export const PosterCard = ({ id, index, moveCard }) => {
  const [movie, setMovie] = useState("");
  const getMovie = id => {
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
    <div className='posterDiv' ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {getMovie(id)}
      <Col className='left'>
        <Card className="posterCard">
        <Col className='posterNum'>
        <Badge pill bg="warning">
          {index}
        </Badge>{' '}
        </Col>
        <Col className='posterImg'>
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
        /></Col>
      </Card>
      </Col>
      <Col className='right'>
      <Card className='posterText'>
      <Card.Title>
        {title}
      </Card.Title>
      </Card>
      </Col>
    </div>
  )
}
