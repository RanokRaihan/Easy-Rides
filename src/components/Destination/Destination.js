import React from 'react';
import { useParams } from 'react-router';
import './Destination.css';
import fakeData from '../../fakeData/fakeData.json';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

//fontawsome


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faUsers, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react/cjs/react.development';
import SimpleMap from '../SimpleMap/SimpleMap';

const Destination = () => {
    let { id } = useParams();
    console.log(id);
    const [isSearched, setIsSearched] = useState(false);

    const data = fakeData.find(element => element.id == id)

    const handleSearch = () => {
        // eslint-disable-next-line no-unused-vars
        setIsSearched(true);
    }
    return (
        <div className='destination'>
            <div className="dest-grid">
                <div className="dest-search-wrapper">
                    <div className="dest-search">
                        <label htmlFor="pickFrom">Pick From:</label>
                        <input type="text" name='pickFrom' />
                        <label htmlFor="pickTo">Pick To</label>
                        <input type="text" name='pickTo' />
                        <button onClick={handleSearch} className='btn btn-primary btn-center'>search</button>
                    </div>
                    {isSearched &&
                        <div className="dest-search-result">
                            <div className='fare-grid'>
                                <div className="ride-image">
                                    <img src={data.icon} alt="" />
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faUserAlt} />
                                </div>
                                <div>
                                    <p>1</p>
                                </div>
                                <div>
                                    <p>{data.onePersonFare}</p>
                                </div>
                            </div>



                            <div className='fare-grid'>
                                <div className="ride-image">
                                    <img src={data.icon} alt="" />
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faUserFriends} />
                                </div>
                                <div>
                                    <p>2</p>
                                </div>
                                <div>
                                    <p>{data.twoPersonFare}</p>
                                </div>
                            </div>

                            <div className='fare-grid'>
                                <div className="ride-image">
                                    <img src={data.icon} alt="" />
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <div>
                                    <p>4</p>
                                </div>
                                <div>
                                    <p>{data.fourPersonFare}</p>
                                </div>
                            </div>

                        </div>
                    }


                </div>
                <div className="map">
                    <SimpleMap></SimpleMap>
                </div>
            </div>
        </div>
    );
};

export default Destination;