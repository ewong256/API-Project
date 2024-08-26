import { csrfFetch } from "./csrf";

// action types
const GET_SPOTS = 'spots/getSpots'
const ADD_SPOT = 'spots/addSpot'
const REMOVE_SPOT = 'spots/removeSpot'
const LOAD_SPOT_ID = 'spots/loadSpotId'
const EDIT_SPOT = 'spots/editSpot'
const ADD_SPOT_IMAGE = 'spots/addSpotImage'

// action creators
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
})

const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})

const addSpotImage = (spotImage) => ({
    type: ADD_SPOT_IMAGE,
    spot: spotImage
});


const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
})


const loadSpotId = (spot) => ({
    type: LOAD_SPOT_ID,
    spot
})

const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
})


// thunks
export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    const spotData = await response.json()
    dispatch(getSpots(spotData.Spots))
    return response
}

export const getSpotId = (spotId) => async(dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    const spotData = await response.json()
    dispatch(loadSpotId(spotData))
    return response
}

export const createSpot = (spotData) => async(dispatch) => {
    const { name, description, address, city, country, state, lat, lng, price } = spotData;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price })
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(addSpot(newSpot));
        return newSpot;
    }
};

export const addImageToSpot = (spotId, imageUrl, preview) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: imageUrl, preview })
    });

    if (response.ok) {
        const newImage = await response.json();
        dispatch(addSpotImage({ ...newImage, spotId }));
        return newImage;
    }
};


export const updateSpot = (spotId, spotData) => async(dispatch) => {
    const response  = await csrfFetch(`/api/spots/${spotId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spotData)
        }
    )
    if (response.ok) {
        const updatedSpot = await response.json()
        dispatch(editSpot(updatedSpot))
        return updatedSpot
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(removeSpot(spotId))
        return await response.json()
    } else {
        return response
    }
}

// reducers
export default function spotsReducer(state = {}, action) {
    switch(action.type) {
        case GET_SPOTS: {
            let newState = {}
            action.spots.forEach(spot => newState[spot.id] = spot)
            return newState
        }
        case LOAD_SPOT_ID: {
            let newState = { ...state }
            const spot = action.spot
            newState[spot.id] = spot
            return newState
        }
        case ADD_SPOT: {
            let newState = { ...state }
            const spot = action.spot
            newState[spot.id] = spot
            return newState
        }
        case EDIT_SPOT: {
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        }
        case REMOVE_SPOT: {
        const newState = { ...state }
        delete newState[action.spotId]
        return newState
        }
        default:
            return state
    }
}
