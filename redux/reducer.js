import { combineReducers } from 'redux';
import { SAVE_DATA_SUCCESS, SAVE_DATA_FAILED } from './actions';

const merge = (prev, next) => Object.assign({}, prev, next);

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_DATA_SUCCESS:
      return merge(state, { listData: action.payload });
    case SAVE_DATA_FAILED:
      return merge(state, { listError: action.payload });
    default:
      return state;
  }
};

const reducer = combineReducers({
  data: dataReducer,
});

export default reducer;
