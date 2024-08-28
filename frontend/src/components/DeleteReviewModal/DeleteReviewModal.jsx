import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteSpotReview } from "../../store/reviews";
import { getSpotReviews } from "../../store/reviews";
import './DeleteReviewModal.css'

function DeleteReviewModal({ reviewId, spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const targetedRemoval = () => {
        return dispatch(deleteSpotReview(reviewId))
            .then(dispatch(getSpotReviews(spotId)))
            .then(closeModal)
    }

    return (
        <div className="delete-review-modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <div className="confirmation-buttons">
                <button onClick={targetedRemoval}>Yes (Delete Review)</button>
                <button onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
