import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getUsersStart, getUsersSuccess, getUsersFailure } from '../slice/slice';
import { getProductStart, getProductSuccess, getProductFailure } from '../slice/ProductSlice';
import {  addToCartFailure, addToCartSuccess, ADD_TO_CART_START } from '../slice/cartSlice';
import { getCartFailure, getCartStart, getCartSuccess, setRemoveQuantityFailure, setRemoveQuantityStart, setRemoveQuantitySuccess, setaddMoreQuantityFailure, setaddMoreQuantityStart, setaddMoreQuantitySuccess } from '../slice/GetCartSlice';
import { deleteFailure, deleteStart, deleteSuccess } from '../slice/deleteSlice';
import { categoryFailure, categoryStart, categorySuccess } from '../slice/categorySlice';
import { getsubTotalFailure, getsubTotalStart, getsubTotalSuccess } from '../slice/SubTotallingSlice';

export function* fetchUsersSaga() {
  try {
    yield put(getUsersStart());
    const response = yield call(axios.get, 'https://api.slingacademy.com/v1/sample-data/photos');
    yield put(getUsersSuccess(response.data));
  } catch (error) {
    yield put(getUsersFailure(error.message));
  }
}

export function* fetchProductsSaga() {
  try {
    yield put(getProductStart());
    const response = yield call(axios.get, 'http://192.168.0.63:8080/api/v3/getAllproducts');
    yield put(getProductSuccess(response.data));
  } catch (error) {
    console.error('Error fetching products:', error.message);
    yield put(getProductFailure(error.message));
  }
}

function* addToCartSaga(action) {
  try {
    const response = yield call(axios.post, 'http://192.168.0.63:8080/api/v3/add_cart', action.payload);
    yield put(addToCartSuccess(response.data));
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}


function* getByCartIdSaga(action) {
  try {

    const res = yield call(axios.get, `http://192.168.0.63:8080/api/v3/cart_items/${action.payload}`);

    if (res.status === 200) {
      yield put(getCartSuccess(res.data));
    } else {
      yield put(getCartFailure(error.message));
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    yield put(getCartFailure(err.message));
  }
}


function* getSubTotalSaga(action) {
  try {

    const res = yield call(axios.get, `http://192.168.0.63:8080/api/v3/subTotal_byUser/${action.payload}`);

    if (res.status === 200) {
      console.log(res.data,"resres");
      yield put(getsubTotalSuccess(res.data));
    } else {
      yield put(getsubTotalSuccess(error.message));
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    yield put(getsubTotalFailure(err.message));
  }
}



function* addQuantitySaga(action) {
  try {
    const { cartItemId, quantity ,totalByProduct} = action.payload;

    const res = yield call(axios.put, `http://192.168.0.63:8080/api/v3/add_quantity/${cartItemId}`, { quantity,totalByProduct });

    if (res.status === 200) {
      yield put(setaddMoreQuantitySuccess(res.data));
    } else {
      yield put(setaddMoreQuantityFailure(res.data.message)); 
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    yield put(setaddMoreQuantityFailure(err.message));
  }
}


function* removeQuantitySaga(action) {
  try {
    const { cartItemId, quantity ,totalByProduct} = action.payload;

    const res = yield call(axios.put, `http://192.168.0.63:8080/api/v3/remove_quantity/${cartItemId}`, { quantity,totalByProduct });

    if (res.status === 200) {
      yield put(setRemoveQuantitySuccess(res.data));
    } else {
      yield put(setRemoveQuantityFailure(res.data.message)); 
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    yield put(setRemoveQuantityFailure(err.message));
  }
}

function* deleteCartSaga(action) {
  try {
    const { cartItemId } = action.payload;

    const res = yield call(axios.delete, `http://192.168.0.63:8080/api/v3/remove_Cart/${cartItemId}`);

    if (res.status === 200) {
      yield put(deleteSuccess(res.data));
    } else {
      yield put(deleteFailure(res.data.message)); 
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    yield put(deleteFailure(err.message));
  }
}

export function* fetchCategorySaga() {
  try {
    yield put(categoryStart());
    const response = yield call(axios.get, 'http://192.168.0.63:8080/api/v3/categories_type');
    yield put(categorySuccess(response.data));
  } catch (error) {
    yield put(categoryFailure(error.message));
  }
}





export default function* rootSagaMain() {

  yield call(fetchUsersSaga),
    yield call(fetchProductsSaga),
    yield takeLatest(getCartStart, getByCartIdSaga),
    yield takeLatest(ADD_TO_CART_START, addToCartSaga)
    yield takeLatest(setaddMoreQuantityStart,addQuantitySaga)
    yield takeLatest (setRemoveQuantityStart, removeQuantitySaga)
    yield takeLatest(deleteStart,deleteCartSaga)
    yield takeLatest(getsubTotalStart,getSubTotalSaga)
    yield call(fetchCategorySaga)

}
