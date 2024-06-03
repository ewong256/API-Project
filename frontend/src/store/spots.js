import { csrfFetch } from "./csrf";

// action types
const GET_SPOTS = 'spots/getSpots'
const ADD_SPOT = 'spots/addSpot'
const REMOVE_SPOT = 'spots/removeSpot'
const LOAD_SPOT_ID = 'spots/loadSpotId'
const EDIT_SPOT = 'spots/editSpot'

// action creators
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
})

const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})

const removeSpot = (spot) => ({
    type: REMOVE_SPOT,
    spot
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
const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    const spotData = response.json()
    dispatch(getSpots(spotData))
    return response
}
