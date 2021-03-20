import React from 'react';
import './Home.css'

const Home = (props) => {
    const { rideName, image } = props.fakeData;
    return (

        <div className="single-ride">
            <img src={image} alt="" />
            <h2 className='ride-heading'>{rideName}</h2>
        </div>

    );
};

export default Home;