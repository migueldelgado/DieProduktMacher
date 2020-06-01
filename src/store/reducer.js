import * as actionTypes from './actions';

const initialState = {
    toggleSidebar: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TOGGLE_SIDEBAR:
            return {
                ...state,
                toggleSidebar: action.value
            }
    }       

    return state;
}

export default reducer;