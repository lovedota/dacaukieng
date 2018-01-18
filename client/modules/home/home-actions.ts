import { dispatch } from 'client/root/root-store';

export default {
    init() {
        dispatch({
            type: 'home/init'
        });
    },

    loadMore() {
        dispatch({
            type: 'home/load-more'
        });
    },

    openArticle(item) {
        dispatch({
            type: 'home/view-details/open',
            data: {
                item
            }
        });
    },

    closeArticle() {
        dispatch({
            type: 'home/view-details/close'
        });
    }
};
