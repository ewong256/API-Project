import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './ManageSpots.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx'
import DeleteModal from '../DeleteModal/DeleteModal.jsx'
import { fetchSpots } from '../../store/spots.js'
import { useEffect } from 'react'

function ManageSpots() {
    const dispatch = useDispatch()


    let spots = useSelector((state) => state.spots)
    spots = Object.values(spots)

    const userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    const ownedSpots = spots.filter((spot) => spot.ownerId === userId)

    return (
        <>
            <h1> Manage Your Spots</h1>
            <div className='createSpotLink'>
                <NavLink to='/spots/new'>Create Spot</NavLink>
            </div>
            <div className='yourSpots'>
                <div className='spotsContainer'>
                    {ownedSpots.map((spot) => (
                        <div className='spotName' key={spot.id}>
                            <NavLink className='spotLink' to={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} className='spotThumbnail' alt='Spot Preview' />
                                <span className='spotName'>{spot.name}</span>
                                <div className='spotPrice'>
                                    {spot.price} / night
                                </div>
                            </NavLink>
                            <OpenModalButton
                                buttonText='Delete'
                                className='delete-spot-button'
                                modalComponent={<DeleteModal spotId={spot.id} />}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>

    )

}

export default ManageSpots
