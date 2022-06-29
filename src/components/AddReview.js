import React, { useState } from "react";
import MovieDataService from "../services/movies";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();

    let editing = false;
    let initialReviewState = "";
    //
    //
    let location = useLocation();
    

    const [review, setReview] = useState(initialReviewState);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id // get movie id from url
        }

        if (location.state && data.movie_id === location.state.currentReview.movie_id &&
            data.user_id === location.state.currentReview.user_id) {
                editing = true;
                data.review_id = location.state.currentReview._id;
            }

        if (editing) {
            // Todo: Handle case where an existing
            // review is being updated
            MovieDataService.editReview(data)
                .then(response => {
                    navigate("/movies/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            MovieDataService.createReview(data)
                .then(response => {
                    navigate("/movies/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <Container className="main_container">
            <Form>
                <Form.Group>
                    <Form.Label>{ editing ? "Edit" : "Create"} Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        review={ review }
                        onChange = { onChangeReview }
                        defaultValue={ editing ? null : "" }
                    />
                </Form.Group>
                <Button variant="primary" onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview;