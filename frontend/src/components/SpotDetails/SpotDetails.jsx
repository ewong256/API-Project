import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getSpotId } from '../../store/spots.js'
import './SpotDetails.css'

function SpotDetails() {

    const dispatch = useDispatch()
    const { spotId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    let spot = useSelector((state) => state.spots)
    let thisSpot = spot[spotId]



    useEffect(() => {
        dispatch(getSpotId(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId])

    return(
        <>
        {isLoaded && spot && (
            <h2>{thisSpot.name} PAIN PAIN PAIN WHYYYYYYYYYYYYYYYYYYYYYYY WORK PLEASE</h2>
        )}

        </>
    )
}


export default SpotDetails
