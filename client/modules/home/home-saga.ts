import thumbnailDefault from './styles/images/thumbnail-default.jpg';

import * as moment from 'moment';
import { put, takeEvery, select } from 'redux-saga/effects';
import HomeServices from './home-services';

function* fetchItems(action) {
    try {
        const { q, page, isLoaded } = yield select((state: any) => state.home);

        const { data } = yield HomeServices.getVideo(page);

        const { items, total } = data;

        yield put({
            type: 'home/load-more/success',
            data: {
                items,
                total
            }
        });

        if (!isLoaded) {
            yield put({
                type: 'home/init/success',
            });
        }
    } catch (error) {
        yield put({ type: 'home/load-more/error', error });
    }
}

export default function* homeSaga() {
    yield takeEvery('home/init', fetchItems);
    yield takeEvery('home/load-more', fetchItems);
}
