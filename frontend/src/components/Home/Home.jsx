import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import './Home.css'

function Home() {
    const dispatch = useDispatch()
    let spots = useSelector((state) => state.spots)
    spots = Object.values(spots)

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    if(!spots) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div className="home">
            {spots.map((spot, index) =>
                <Link
                    to={`/spots/${spot.id}`}
                    key={index}
                    >
                    <div className="spot-grid">
                            <img src={spot.previewImage}/>
                        <div className="spot-details">
                            <p>{spot.city}, {spot.state}</p>
                            <p>{spot.avgRating ? <><FaStar />{Number(spot.avgRating).toFixed(2)}</>: <><FaStar /> New</>}</p>
                        </div>
                        <p>{`$${spot.price} / Night`}</p>
                    </div>
                </Link>
            )}
        </div>
        </>
    )
}

export default Home
