import axios from 'axios';

export default {
    getPlaces() {
        return axios.get('/api/home/places');
    }
};
