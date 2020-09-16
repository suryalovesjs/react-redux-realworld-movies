import { getPersonDetail } from "api/";
import {
  requestPersonDetails,
  receivePersonDetails,
  returnPersonDetailsNotFound,
} from "../dispatchers";

const fetchPersonDetails = (storeName) => (dispatch) => {
  dispatch(requestPersonDetails(storeName));

  return getPersonDetail(storeName).then((response) => {
    if (response && response.data) {
      dispatch(receivePersonDetails(response.data, storeName));
    } else {
      dispatch(returnPersonDetailsNotFound(storeName));
    }
  });
};

const shouldFetchPersonDetails = (state, storeName) => {
  const { personDetailsReducer } = state;
  const details = personDetailsReducer[storeName];

  return !details || Object.keys(details).length > 1;
};

export const peekPersonDetails = (storeName) => (dispatch, getState) => {
  if (shouldFetchPersonDetails(getState(), storeName)) {
    return dispatch(fetchPersonDetails(storeName));
  }
};
