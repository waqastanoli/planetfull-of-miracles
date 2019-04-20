import _ from 'lodash';
import axios from 'axios';
import API_URL from '../config/API_URL';

const getProductsAction = (page, perpage, search='null') => {
  if(search==''){
    search='null';
  }
  return (dispatch) => {
    dispatch({ type: 'PRODUCTS' });
    
    axios.get(`${API_URL.API_URL}/api/v1/products/page/${page}/${perpage}/${search}`)
    .then(res => {
      const { status, data, totalProducts, page, perpage } = res.data;
      if  (status) {
        dispatch({ type: 'PRODUCTS_FULFILLED', payload: { list: data,page:page ,perpage:perpage,  totalProducts:totalProducts, }});
      } else {
        dispatch('PRODUCTS_REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}


const getProductsDetail = (name) => {
  return (dispatch) => {
    dispatch({ type: 'GET_PRODUCT_DETAIL' });
    
    axios.get(`${API_URL.API_URL}/api/v1/products/detail/${name}`)
    .then(res => {
      const { status, data } = res.data;
      if  (status) {
        dispatch({ type: 'PRODUCT_DETAIL_FULFILLED', payload: { product: data }});
      } else {
        dispatch('PRODUCT_DETAIL__REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}

const searchProductAction = (products, searchKey) => {
  return (dispatch) => {
    dispatch({ type: 'SEARCH_PRODUCT' });
    
    axios.post(`${API_URL.API_URL}/api/v1/products/search`, {
      name: searchKey.toLowerCase()
    })
    .then(res => {
      const { status, data } = res.data;
      if  (status) {
        dispatch({ type: 'PRODUCTS_FULFILLED', payload: { list: data }});
      } else {
        dispatch('PRODUCTS_REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}

const suggestProductAction = ( searchKey) => {
  return (dispatch) => {
    dispatch({ type: 'SEARCH_SUGGESTION' });
    
    axios.post(`${API_URL.API_URL}/api/v1/products/suggest`, {
      name: searchKey.toLowerCase()
    })
    .then(res => {
      const { status, suggestions } = res.data;
      if  (status) {
        dispatch({ type: 'SUGGESTION_FULFILLED', payload: { suggestions_list: suggestions }});
      } else {
        dispatch('SUGGESTION_REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}

export default { getProductsAction, getProductsDetail, searchProductAction, suggestProductAction };
