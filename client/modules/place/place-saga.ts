import { call, put, takeEvery } from 'redux-saga/effects';
import PlaceServices from './place-services';

function* fetchItems() {
    try {
        const { data } = yield PlaceServices.getPlaces();

        yield put({
            type: 'place/init/success',
            data: {
                locations: data.locations
            }
        });

    } catch (error) {
        yield put({ type: 'place/init/error', error });
    }
}

export default function* aboutSaga() {
    yield takeEvery('place/init', fetchItems);
}
