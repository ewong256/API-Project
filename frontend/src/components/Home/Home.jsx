import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom'
import './Home.css'

function Home() {
    const dispatch = useDispatch()
    let spots = useSelector((state) => state.spots)
    spots = Object.values(spots)

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return (
        <>
            <h1>TEST TEST TEST</h1>
            <div className='spotContainer'>
                <h2>TEST</h2>
                {spots.map((spot) => (
                    <div className='spotName' key={spot.id}>
                        <NavLink className='spotLink' to={`/spots/${spot.id}`}>
                            <img src={spot.previewImage} className='spotThumbnail' alt='Spot Preview' />
                            <span className='spotName'>{spot.name}</span>
                            <div className='spotPrice'>
                                {spot.price} / night
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home
