import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createSpot, getSpotId, addImageToSpot } from '../../store/spots'
import { useNavigate } from 'react-router-dom'
import './CreateSpot.css'

function CreateSpot() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [imageUrls, setImageUrls] = useState(['', '', '', '', '']) // Initialize with 5 empty strings
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (!submitted) return

        const errorsArray = []

        if (!name) {
            errorsArray.push('Name is required')
        }

        if (description.length < 30) {
            errorsArray.push('Description needs 30 or more characters')
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

        if (!price) {
            errorsArray.push('Price per night is required')
        }

        if (!previewImage) {
            errorsArray.push('Preview Image URL is required')
        }

        setErrors(errorsArray)
    }, [
        name,
        description,
        address,
        city,
        country,
        state,
        price,
        previewImage,
        imageUrls,
        submitted,
    ])

    async function onSubmit(e) {
        e.preventDefault()
        setSubmitted(true)

        const errorsArray = []

        if (!name) {
            errorsArray.push('Name is required')
        }

        if (description.length < 30) {
            errorsArray.push('Description needs 30 or more characters')
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

        if (!price) {
            errorsArray.push('Price per night is required')
        }

        if (!previewImage) {
            errorsArray.push('Preview Image URL is required')
        }

        setErrors(errorsArray)

        if (errorsArray.length > 0) return

        const spot = {
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

        const newSpot = await dispatch(createSpot(spot))

        if (newSpot) {
            await dispatch(addImageToSpot(newSpot.id, previewImage, true))

            for (let url of imageUrls) {
                if (url) {
                    await dispatch(addImageToSpot(newSpot.id, url, false))
                }
            }

            await dispatch(getSpotId(newSpot.id))
            navigate(`/spots/${newSpot.id}`)
        }
    }

    function handleImageUrlChange(index, value) {
        const newImageUrls = [...imageUrls]
        newImageUrls[index] = value
        setImageUrls(newImageUrls)
    }

    return (
        <div className="create-spot-form-container">
            <h2>Create a New Spot</h2>
            <form onSubmit={onSubmit}>
                {submitted && errors.length > 0 && (
                    <div className="form-errors">
                        {errors.map((error, idx) => <p key={idx} className="error">{error}</p>)}
                    </div>
                )}
                <section>
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                    <label>
                        Country:
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
                    </label>
                    <label>
                        Street Address:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address" />
                    </label>
                    <label>
                        City:
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                    </label>
                    <label>
                        State:
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                    </label>
                    <label>
                        Latitude:
                        <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
                    </label>
                    <label>
                        Longitude:
                        <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" />
                    </label>
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
                                placeholder={index === 0 ? "Preview Image URL" : "Image URL"}
                            />
                        </label>
                    ))}
                </section>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default CreateSpot
