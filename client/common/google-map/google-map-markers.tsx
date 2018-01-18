import './styles/google-map-markers.scss';
import React from 'react';
import MarkerWithLabelInstance from 'markerwithlabel';
import GoogleMapHelpers from './google-map-helpers';

let MarkerWithLabel;

interface Props {
    value: any[];
}

interface State {
    isLoading: boolean;
}

export default class GoogleMapMarkers extends React.Component<Props, State> {
    $map: JQuery;

    constructor() {
        super();

        this.state = {
            isLoading: false
        };
    }
    componentDidMount() {
        this.$map = $('#map-canvas');

        this.setState({
            isLoading: true
        });

        GoogleMapHelpers.loadMap().then(() => {
            MarkerWithLabel = MarkerWithLabelInstance(window.google.maps);
            this.processMarkers(this.props.value);

            this.setState({
                isLoading: false
            });
        });
    }

    shouldComponentUpdate() {
        return false;
    }

    processMarkers(locations) {
        let defaultOptions = {
            zoom: 12,
            center: new google.maps.LatLng(49.47805, -123.84716),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
            bounds = new google.maps.LatLngBounds(),
            map = new google.maps.Map(this.$map[0], defaultOptions),
            marker;

        locations.forEach(loc => {
            marker = new MarkerWithLabel({
                position: loc.position,
                icon: GoogleMapHelpers.pinSymbol(loc.color),
                map: map,
                labelContent: loc.label,
                labelAnchor: new google.maps.Point(3, 30),
                labelClass: 'labels', // the CSS class for the label
                labelInBackground: false,
                labelStyle: { opacity: 0.75 }
            });

            bounds.extend(marker.position);
        });

        map.fitBounds(bounds);
    }

    render() {
        let loader;

        if (this.state.isLoading) {
            loader = (
                <div className="loader">
                    <div className="loader_ajax_small"></div>
                </div>
            );
        }

        return (
            <>
                {loader}
                <div id="map-canvas" style={{ height: 400 }}></div>
            </>
        );
    }
}