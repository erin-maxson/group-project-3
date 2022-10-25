import './Location.css'
import Map from '../Map/Map'
import { Popup } from 'react-map-gl'
import React, { useState } from 'react'
import logo from '../../assets/vanlogo.png'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ADD_LOCATION } from '../../utils/mutations'
import { QUERY_LOCATIONS, QUERY_ME, QUERY_LOCATION } from '../../utils/queries'
import { useQuery } from '@apollo/react-hooks'
import Auth from '../../utils/auth';


const Placer = () => {



    
    const [formState, setFormState] = useState({
        username: '',
        title: '',
        description: '',
        rating: '',
        latitude: undefined,
        longitude: undefined,

    });

    const [saveLocation, { error: err, data: locationData  }] = useMutation(ADD_LOCATION);

    

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        });


    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await saveLocation({

                variables: { ...formState,
                    latitude: parseFloat(formState.latitude),
                    longitude: parseFloat(formState.longitude)
                },



            });
            Auth.login(data.saveLocation.token);

        } catch (event) {
            console.error(event);
        }

    };


    return (
        <div>
            <Map />

            <div>

                <div className='add-pin'>



                    <div>
                        <Link to="/">
                            <AiFillCloseCircle />
                        </Link>
                    </div>

                    <div className='logo'>
                        <img src={logo} alt='small van logo' />
                    </div>


                    <form className='pinForm' onSubmit={handleFormSubmit}>
                    <label htmlFor="">Username</label>
                        <input
                            name='username'
                            type="text"
                            value={formState.username}
                            placeholder='username'
                            onChange={handleChange}
                        />
                        <label htmlFor="">Pin Name</label>
                        <input
                            name='title'
                            type="text"
                            value={formState.title}
                            placeholder='Enter a pin title.'
                            onChange={handleChange}
                        />
                        <label htmlFor="">Pin Description</label>
                        <input
                            name='description'
                            type="text"
                            value={formState.description}
                            placeholder='Enter a description.'
                            onChange={handleChange}
                        />
                        <label htmlFor="">Leave a Rating</label>
                        <input
                            name='rating'
                            type="number"
                            value={formState.rating}
                            placeholder='Leave a rating'
                            onChange={handleChange}
                        />
                        <input
                            name='latitude'
                            type="number"
                            step="any"
                            value={formState.latitude}
                            placeholder='latitude'
                            onChange={handleChange}
                        />
                        <input
                            name='longitude'
                            type="number"
                            step="any"
                            value={formState.longitude}
                            placeholder='longitude'
                            onChange={handleChange}
                        />
                        <button className='submitBtn' type='submit' >Add pin to map!</button>
                    </form>

                </div >




                {err && (
                    <div>
                        {err.message}
                    </div>
                )}

            </div>

        </div >
    )


}


export default Placer