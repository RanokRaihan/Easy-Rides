import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../App';



const PrivetRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.isSignedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivetRoute;