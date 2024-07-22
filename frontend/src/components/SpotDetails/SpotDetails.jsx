import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { getSpotId } from '../../store/spots.js'
import { getSpotReviews } from '../../store/reviews.js'
import { FaStar } from 'react-icons/fa6'
import { LuDot } from 'react-icons/lu'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal.jsx'
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal.jsx'
import './SpotDetails.css'

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const spot = useSelector((state) => state.spots[spotId])
    const sessionUser = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => state.reviews)
    const thisReviews = Object.values(reviews)

    const [showModal, setShowModal] = useState(false)
    const click = useRef()

    let sessionUserId = -1
    if (sessionUser) {
        sessionUserId = sessionUser.id
    }

    let nonReviewer = true
    if (thisReviews) {
        thisReviews.forEach((review) => {
            if (review.User && review.User.id === sessionUserId) nonReviewer = false
        });
    }

    const avgStars = thisReviews.length ? (thisReviews.reduce((acc, review) => acc + review.stars, 0) / thisReviews.length).toFixed(2) : 'No Reviews'
    const numReviews = thisReviews.length

    useEffect(() => {
        dispatch(getSpotId(spotId))
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        if (!showModal) return;

        const closeMenu = (e) => {
            if (!click.current.contains(e.target)) {
                setShowModal(false)
            }
        };

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showModal])

    const closeMenu = () => setShowModal(false)

    const handleClick = () => {
        window.alert('Feature Coming Soon...')
    }

    if (!spot || !thisReviews || !spot.SpotImages) {
        return <div>Loading...</div>
    }

    return (
        <div id="spot-details">
            <h2>{spot.name}</h2>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            <div id="spot-image-gallery">
                <figure id="preview-image">
                    <img className="gallery-image" src={spot.SpotImages[0] ? spot.SpotImages[0].url : ""} />
                </figure>
                <div id="small-images">
                    <figure>
                        <img className="gallery-image" src={spot.SpotImages[1] ? spot.SpotImages[1].url : ""} />
                    </figure>
                    <figure>
                        <img className="gallery-image" src={spot.SpotImages[2] ? spot.SpotImages[2].url : ""} />
                    </figure>
                    <figure>
                        <img className="gallery-image" src={spot.SpotImages[3] ? spot.SpotImages[3].url : ""} />
                    </figure>
                    <figure>
                        <img className="gallery-image" src={spot.SpotImages[4] ? spot.SpotImages[4].url : ""} />
                    </figure>
                </div>
            </div>
            <div id="spot-description-box">
                <div id="spot-description">
                    <h3>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                    <p>{spot.description}</p>
                </div>
                <div id="spot-callout-box">
                    <div id="text">
                        <p id="price">${spot.price}</p>
                        <p id="review">{Number(avgStars) ? <><FaStar id="star" /> {avgStars} </> : <><FaStar id="star" />{"New"}</>} {numReviews !== 0 ? <><LuDot /> {(numReviews === 1 ? numReviews + " review" : numReviews + " reviews")}</> : null} </p>
                    </div>
                    <div id="button">
                        <button onClick={handleClick}>Reserve</button>
                    </div>
                </div>
            </div>
            <div id="spot-reviews">
                <h3>{Number(avgStars) ? <><FaStar /> {avgStars} </> : <><FaStar />{"New"}</>} {numReviews !== 0 ? <><LuDot /> {(numReviews === 1 ? numReviews + " review" : numReviews + " reviews")}</> : null}</h3>
                {numReviews === 0 && spot.Owner?.id !== sessionUserId && <h2>Be the first to post a review!</h2>}
                {sessionUser && spot.Owner?.id !== sessionUserId && nonReviewer && <OpenModalButton
                    buttonText="Post Your Review"
                    onButtonClick={closeMenu}
                    modalComponent={<ReviewFormModal spotId={spot.id} sessionUser={sessionUser} />}
                />}
                {thisReviews ? thisReviews.map(review => (
                    <div id="review-box" key={review.id}>
                        <h3>{review.User && review.User.firstName}</h3>
                        <p>{new Date(review.createdAt).toLocaleDateString("en-us", { month: 'long', year: 'numeric' })}</p>
                        <p>{review.review}</p>
                        {review.User && review.User.id === sessionUserId && (
                            <OpenModalButton
                                buttonText="Delete Your Review"
                                onButtonClick={closeMenu}
                                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spot.id} />}
                            />
                        )}
                    </div>
                )) : "Be the first to review!"}
            </div>
        </div>
    );
}

export default SpotDetails;
