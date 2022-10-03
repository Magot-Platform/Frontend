import {
    TOKENLIST_CREATED,
    TOKENLIST_FAILED
} from '../actions/types';

const initialState = [];

function tokenlistReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case TOKENLIST_CREATED:
            return {
            ...state,
            ...payload
        };
        case TOKENLIST_FAILED:
            return {
                ...state
        };
        default:
            return state;
    }
  }
  
  export default tokenlistReducer;
  