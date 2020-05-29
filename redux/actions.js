export const SAVE_DATA_SUCCESS = 'SAVE_DATA_SUCCESS';
export const SAVE_DATA_FAILED = 'SAVE_DATA_FAILED';

export const saveData = (list) => async (dispatch) => {
  try {
    dispatch({ type: SAVE_DATA_SUCCESS, payload: list });
  } catch (err) {
    dispatch({ type: SAVE_DATA_FAILED, payload: err.message });
  }
};
