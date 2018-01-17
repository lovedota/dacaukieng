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

    viewArticle(item) {
        window.open(item.url, '_blank');
    }
};
