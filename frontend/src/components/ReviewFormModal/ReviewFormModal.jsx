import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { createSpotReview, getSpotReviews } from '../../store/reviews'
import StarRatingInput from './StarRatingInput'

function ReviewFormModal({spotId, sessionUser}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [stars, setStars] = useState(0)
    const [review, setReview] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const errors = {}
        if (stars === 0) errors.star = 'Please input a number'
        if (review.length < 10) errors.review = 'Review cannot be less than 10 characters'

        setValidationErrors(errors)
    }, [stars, review])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = { review, stars }
        setErrors({})
        return dispatch(createSpotReview(newReview, spotId, sessionUser))
            .then(() => {
                dispatch(getSpotReviews(spotId))
                closeModal()
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data?.errors) {
                    setErrors(data.errors)
                }
            });
    };

    const settingStar = (number) => {
        setStars(parseInt(number))
        console.log(stars)
        console.log(review)
    }

    return (
        <form onSubmit={(handleSubmit)}>
            <h1> Rate your stay! </h1>
                {errors.message && (
                    <p>{errors.message}</p>
                )}
                <textarea
                    type='text'
                    name='review'
                    value={review}
                    placeholder='Review goes here'
                    onChange={(e) => setReview(e.target.value)}
                />
                <StarRatingInput
                    onChange={settingStar}
                    stars={stars}
                />
                <button
                    type='submit'
                    disabled={Object.keys(validationErrors).length > 0}
                >
                    Submit Review
                </button>
        </form>
    )
}

export default ReviewFormModal
