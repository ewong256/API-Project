import { csrfFetch } from "./csrf";


// action types
const GET_REVIEWS = 'reviews/getReviews'
const ADD_REVIEW = 'reviews/addReview'
const DELETE_REVIEW = 'reviews/deleteReview'

//action creators
const getReview = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

// thunks
export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok) {
    const reviews = await response.json()
    dispatch(getReview(reviews))
    return reviews
    }

}

export const createSpotReview = (review, spotId, sessionUser) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...review,
            userId: sessionUser.id
        }),
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview));
        return newReview;
    } else {
        const error = await response.json();
        throw error;
    }
};

export const deleteSpotReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    dispatch(removeReview(reviewId))
    return response
}

// reducers
export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
      case GET_REVIEWS: {
        let newState = {}
        action.reviews.Reviews.forEach(
          (review) => (newState[review.id] = review),
        )
        return newState
      }
      case ADD_REVIEW: {
        let newState = { ...state, [action.review.id]: action.review }
        return newState
      }
      case DELETE_REVIEW: {
        let newState = { ...state }
        delete newState[action.reviewId]
        return newState
      }

      default:
        return state
    }
  }
