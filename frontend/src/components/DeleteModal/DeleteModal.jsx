import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import './DeleteModal.css'

function DeleteModal({ spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const spotDelete = async () => {
        await dispatch(deleteSpot(spotId)).then(closeModal)
    }

    return (
        <div className="delete-modal-container">
            <h1>Confirm Delete</h1>
            <div className="confirmation">
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className="confirmation-buttons">
                <button onClick={spotDelete}> Yes (Delete Spot) </button>
                <button onClick={closeModal}> No (Keep Spot) </button>
            </div>
        </div>

    )
}

export default DeleteModal
