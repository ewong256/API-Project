import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotId, updateSpot } from "../../store/spots";

function UpdateSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spot = useSelector((state) => state.spots[spotId]);

    const [description, setDescription] = useState(spot?.description || '');
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [country, setCountry] = useState(spot?.country || '');
    const [state, setState] = useState(spot?.state || '');
    const [lat] = useState(spot?.lat || 0);
    const [lng] = useState(spot?.lng || 0);
    const [name, setName] = useState(spot?.name || '');
    const [price, setPrice] = useState(spot?.price || 0);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getSpotId(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        const errorsArray = [];

        if (!description) {
            errorsArray.push('Please set a description');
        }

        if (!address) {
            errorsArray.push('Please set an address');
        }

        if (!city) {
            errorsArray.push('Please set a city');
        }

        if (!country) {
            errorsArray.push('Please set a country');
        }

        if (!state) {
            errorsArray.push('Please set a state');
        }

        if (!name) {
            errorsArray.push('Please set a name');
        }

        if (price <= 0) {
            errorsArray.push('Price must be greater than 0');
        }

        setErrors(errorsArray);

    }, [description, address, city, country, state, name, price]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const updatedSpot = {
            id: spotId,
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price
        };

        const res = await dispatch(updateSpot(spotId, updatedSpot));
        if (res.error) {
            console.log(res.error);
        } else {
            navigate(`/spots/${spotId}`);
        }
    };

    return (
        <div className="create-spot-form-container">
            <h2>Update Your Spot</h2>
            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                {errors.find((error) => error.includes('Name')) && <p>{errors.find((error) => error.includes('Name'))}</p>}
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                {errors.find((error) => error.includes('Description')) && <p>{errors.find((error) => error.includes('Description'))}</p>}
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                {errors.find((error) => error.includes('Address')) && <p>{errors.find((error) => error.includes('Address'))}</p>}
                <label>
                    City:
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                {errors.find((error) => error.includes('City')) && <p>{errors.find((error) => error.includes('City'))}</p>}
                <label>
                    Country:
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </label>
                {errors.find((error) => error.includes('Country')) && <p>{errors.find((error) => error.includes('Country'))}</p>}
                <label>
                    State:
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                </label>
                {errors.find((error) => error.includes('State')) && <p>{errors.find((error) => error.includes('State'))}</p>}
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </label>
                {errors.find((error) => error.includes('Price')) && <p>{errors.find((error) => error.includes('Price'))}</p>}
                <button type="submit" disabled={errors.length > 0}>Update Spot</button>
            </form>
        </div>
    );
}

export default UpdateSpot;
