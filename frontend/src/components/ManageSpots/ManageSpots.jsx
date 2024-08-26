import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import './ManageSpots.css'
import { FaStar } from 'react-icons/fa6'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import DeleteModal from '../DeleteModal/DeleteModal'
import { fetchSpots } from '../../store/spots'
import { useEffect, useRef, useState } from 'react'

function ManageSpots() {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const click = useRef()

    let spots = useSelector((state) => state.spots)
    spots = Object.values(spots)

    const userId = useSelector((state) => state.session.user?.id)

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    useEffect(() => {
        if (!showModal) return;

        const closeModal = (e) => {
            if (!click.current.contains(e.target)) {
                setShowModal(false)
            }
        };
        document.addEventListener('click', closeModal)
        return () => document.removeEventListener('click', closeModal)
    }, [showModal]);

    const closeModal = () => setShowModal(false)

    const ownedSpots = spots.filter((spot) => spot.ownerId === userId)

    if (!ownedSpots.length) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h1>Manage Your Spots</h1>
            <div className='createSpotLink'>
                <NavLink to='/spots/new'>Create Spot</NavLink>
            </div>
            <div className='yourSpots'>
                <div className='spotsContainer'>
                    {ownedSpots.map((spot) => (
                        <div className='spotName' key={spot.id}>
                            <NavLink className='spotLink' to={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} className='spotThumbnail' alt='Spot Preview' />
                                <p className='spotName'>{spot.name}</p>
                                <div className="details">
                                    <p>{spot.city}, {spot.state}</p>
                                    <p>{spot.avgRating ? <><FaStar />{parseInt(spot.avgRating).toFixed(1)}</> : <><FaStar /> New</>}</p>
                                </div>
                                <div className='spotPrice'>$ {spot.price} / night</div>
                            </NavLink>
                            <Link to={`/spots/${spot.id}/edit`}><button>Update</button></Link>
                            <OpenModalButton
                                buttonText='Delete'
                                className='delete-spot-button'
                                onButtonClick={closeModal}
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
