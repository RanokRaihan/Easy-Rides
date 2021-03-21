import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 23.890699,
            lng: 89.109940
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '600px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCbk3achoIyUmgRFTYsB7ukc9fszTwBO84 ' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={23.890699}
                        lng={89.109940}
                        text="My home"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;