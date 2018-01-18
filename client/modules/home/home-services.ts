import axios from 'axios';

export default {
    getVideo(page) {
        return axios.get('/api/home/video', {
            params: {
                page
            }
        });
    }
};
