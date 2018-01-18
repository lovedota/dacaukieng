import { dispatch } from 'client/root/root-store';

export default {
    init() {
        dispatch({
            type: 'place/init'
        });
    },
};
