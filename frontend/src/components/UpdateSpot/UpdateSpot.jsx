import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSpot, getSpotId } from '../../store/spots'
import { useNavigate, useParams } from 'react-router-dom'
import '../CreateSpot/CreateSpot.css'

function UpdateSpot() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const spot = useSelector((state) => state.spots[spotId])


    const [name, setName] = useState(spot?.name || '')
    const [description, setDescription] = useState(spot?.description || '')
    const [address, setAddress] = useState(spot?.address || '')
    const [city, setCity] = useState(spot?.city || '')
    const [country, setCountry] = useState(spot?.country || '')
    const [state, setState] = useState(spot?.state || '')
    const [lat, setLat] = useState(spot?.lat || '')
    const [lng, setLng] = useState(spot?.lng || '')
    const [price, setPrice] = useState(spot?.price || '')
    const [previewImage, setPreviewImage] = useState('')
    const [imageUrls, setImageUrls] = useState(['', '', '', ''])
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        dispatch(getSpotId(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        if (!submitted) return

        const errorsArray = []

        if (!name) {
            errorsArray.push('Name is required')
        }

        if (description.length < 30) {
            errorsArray.push('Description needs 30 or more characters')
        }

        if (description.length > 210) {
            errorsArray.push('Description exceeds character limit')
        }

        if (!address) {
            errorsArray.push('Address is required')
        }

        if (city.length < 5) {
            errorsArray.push('City must be at least 5 characters')
        }

        if (!lat || lat < -90 || lat > 90) {
            errorsArray.push('Latitude must be between -90 and 90')
        }

        if (!lng || lng < -180 || lng > 180) {
            errorsArray.push('Longitude must be between -180 and 180')
        }

        if (!country) {
            errorsArray.push('Country is required')
        }

        if (!state) {
            errorsArray.push('State is required')
        }

        if (!price || price <= 0) {
            errorsArray.push('Price must be greater than 0')
        }

        if (!previewImage) {
            errorsArray.push('Preview Image URL is required')
        }

        setErrors(errorsArray);
    }, [
        name,
        description,
        address,
        city,
        country,
        lat,
        lng,
        state,
        price,
        previewImage,
        imageUrls,
        submitted,
    ]);

    const onSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        const errorsArray = []

        if (!name) {
            errorsArray.push('Name is required')
        }

        if (description.length < 30) {
            errorsArray.push('Description needs 30 or more characters')
        }

        if (description.length > 210) {
            errorsArray.push('Description exceeds character limit')
        }

        if (!address) {
            errorsArray.push('Address is required')
        }

        if (city.length < 5) {
            errorsArray.push('City must be at least 5 characters')
        }

        if (!country) {
            errorsArray.push('Country is required')
        }

        if (!state) {
            errorsArray.push('State is required')
        }

        if (!lat || lat < -90 || lat > 90) {
            errorsArray.push('Latitude must be between -90 and 90')
        }

        if (!lng || lng < -180 || lng > 180) {
            errorsArray.push('Longitude must be between -180 and 180')
        }

        if (!price || price <= 0) {
            errorsArray.push('Price must be greater than 0')
        }

        if (!previewImage) {
            errorsArray.push('Preview Image URL is required')
        }

        setErrors(errorsArray)

        if (errorsArray.length > 0) return

        const updatedSpot = {
            name,
            description,
            address,
            city,
            country,
            state,
            lat,
            lng,
            price,
        }

        await dispatch(updateSpot(spotId, updatedSpot))

        navigate(`/spots/${spotId}`)
    };

    const handleImageUrlChange = (index, value) => {
        const newImageUrls = [...imageUrls]
        newImageUrls[index] = value
        setImageUrls(newImageUrls)
    };

    return (
        <div className="create-spot-form-container">
            <h2>Update Your Spot</h2>
            <form onSubmit={onSubmit}>
                {submitted && errors.length > 0 && (
                    <div className="form-errors">
                        {errors.map((error, idx) => <p key={idx} className="error">{error}</p>)}
                    </div>
                )}
                <section>
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they book a reservation.</p>
                    <label>
                        Country:
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
                    </label>
                    <label>
                        Street Address:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address" />
                    </label>
                    <div className="row">
                        <div className="half-width">
                            <label>
                                City:
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                            </label>
                        </div>
                        <div className="half-width">
                            <label>
                                State:
                                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half-width">
                            <label>
                                Latitude:
                                <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
                            </label>
                        </div>
                        <div className="half-width">
                            <label>
                                Longitude:
                                <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" />
                            </label>
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Please write at least 30 characters" />
                </section>
                <section>
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of your spot" />
                </section>
                <section>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price per night (USD)" />
                </section>
                <section>
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <label>
                        Preview Image URL:
                        <input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder="Preview Image URL" />
                    </label>
                    {imageUrls.map((url, index) => (
                        <label key={index}>
                            Image URL {index + 1}:
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                placeholder={`Image URL ${index + 1}`}
                            />
                        </label>
                    ))}
                </section>
                <button type="submit">Update Spot</button>
            </form>
        </div>
    );
}

export default UpdateSpot;
