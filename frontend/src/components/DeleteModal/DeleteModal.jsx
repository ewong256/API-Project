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
        <div className="deleteModalContainer">
            <h2>DELETE</h2>
            <div className="confirmation">
                <p>Are you sure you want to delete this spot?</p>
            </div>
            <div className="confirmation buttons">
                <button onClick={spotDelete}> Yes </button>
                <button onClick={closeModal}> No </button>
            </div>
        </div>

    )
}

export default DeleteModal
