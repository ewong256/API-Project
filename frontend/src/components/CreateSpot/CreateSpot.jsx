import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createSpot, getSpotId } from '../../store/spots'
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
    const [lat, setLat] = useState(90)
    const [lng, setLng] = useState(180)
    const [price, setPrice] = useState(1)
    const [previewImage, setPreviewImage] = useState({url: "", preview: true})


    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errorsArray = []

        if(name.length < 1) {
            errorsArray.push('Name must be at least 1 character(s) long')
        }

        if(city.length < 5) {
            errorsArray.push('City must be at least 5 characters')
        }

        if(address.length < 5) {
            errorsArray.push('Address must be at least 5 characters')
        }

        if(lat < -90 || lat > 90) {
            errorsArray.push('Lat must be between -90 and 90')
        }

        if(lng < -180 || lng > 180) {
            errorsArray.push('Lng must be between -180 and 180')
        }

        if(!price) {
            errorsArray.push('Price is required')
        }

        if(!country) {
            errorsArray.push('Country is required')
        }

        if(!state) {
            errorsArray.push('State is required')
        }

        if(!description) {
            errorsArray.push('Description is required')
        }

        setErrors(errorsArray)
    }, [
        name,
        description,
        address,
        country,
        city,
        state,
        lat,
        lng,
        price,
        previewImage.url
    ])

    async function onSubmit(e) {
        e.preventDefault()

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
            url: previewImage.url,
            preview: previewImage.preview
        }


        const newSpot = await dispatch(createSpot(spot))
        await dispatch(getSpotId(newSpot.id))
        navigate(`/spots/${newSpot.id}`)
    }


    return (
        <div className="create-spot-form-container">
            <h2>Create a New Spot</h2>
            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                {errors.filter((error) => error.includes('Address'))}
                <label>
                    City:
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                {errors.filter((error) => error.includes('City'))}
                <label>
                    Country:
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </label>
                {errors.filter((error) => error.includes('Country'))}
                <label>
                    State:
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                </label>
                {errors.filter((error) => error.includes('State'))}
                <label>
                    Latitude:
                    <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} />
                </label>
                {errors.filter((error) => error.includes('Lat'))}
                <label>
                    Longitude:
                    <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} />
                </label>
                {errors.filter((error) => error.includes('Lng'))}
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </label>
                {errors.filter((error) => error.includes('Price'))}
                <label>
                    Preview Image URL:
                    <input type="text" value={previewImage.url} onChange={(e) => setPreviewImage({ ...previewImage, url: e.target.value })} />
                </label>
                <button type="submit" disabled={errors.length > 0}>Create Spot</button>
            </form>
        </div>
    );

}


export default CreateSpot
