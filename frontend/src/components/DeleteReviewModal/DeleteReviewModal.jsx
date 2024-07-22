import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteSpotReview } from "../../store/reviews";
import { getSpotReviews } from "../../store/reviews";
import './DeleteReviewModal.css'

function DeleteReviewModal({reviewId, spotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const targetedRemoval = () => {
        return dispatch(deleteSpotReview(reviewId))
            .then(dispatch(getSpotReviews(spotId)))
            .then(closeModal)
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete your review?</p>
            <button onClick={targetedRemoval}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}


export default DeleteReviewModal
