import React from 'react';
import './Destination.css'

const Destination = () => {
    return (
        <div className='destination'>
            <div className="dest-grid">
                <div className="dest-search-wrapper">
                    <div className="dest-search">
                        <label htmlFor="pickFrom">Pick From:</label>
                        <input type="text" name='pickFrom' />
                        <label htmlFor="pickTo">Pick To</label>
                        <input type="text" name='pickTo' />
                        <button class='btn btn-primary btn-center'>search</button>
                    </div>
                    <div className="dest-search-result">

                    </div>

                </div>
                <div className="map">

                </div>
            </div>
        </div>
    );
};

export default Destination;