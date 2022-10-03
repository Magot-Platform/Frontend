import api from '../utils/api';
import {
    TOKENLIST_CREATED,
    TOKENLIST_FAILED
} from './types';
import msg from './msg.json';

// create TokenList
export const createTokenList = (formData) => async(dispatch) => {
    try {
        const res = await api.post('/tokens', formData);

        dispatch({
            type: TOKENLIST_CREATED,
            payload: res.data
        });

        return msg.tokenlist_success;

    } catch (err) {
        const error = err.response.data.error;

        dispatch({
            type: TOKENLIST_FAILED
        });

        return error;
    }
};
