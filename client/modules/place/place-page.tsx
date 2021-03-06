import './styles/place-page.scss';

import React from 'react';
import Loader from 'client/common/loader';
import GoogleMapMarkers from 'client/common/google-map/google-map-markers';

import PlaceActions from './place-actions';

import { connect } from 'react-redux';

type PlacePageProps = {
    isLoaded: boolean;
    locations: any[];
};

class PlacePage extends React.Component<PlacePageProps, any> {
    componentDidMount() {
        PlaceActions.init();
    }

    render() {
        const { isLoaded, locations } = this.props;

        const content = isLoaded ? <GoogleMapMarkers value={locations} /> : <Loader />;

        return (
            <div className="place-page">
                {content}
            </div>
        );
    }
}

export default connect(
    ({place}) => ({
        isLoaded: place.isLoaded,
        locations: place.locations
    })
)(PlacePage);
