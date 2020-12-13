const SET_AUTH = 'SET_AUTH';

let initialAuthReducer = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialAuthReducer, action) => {
    switch (action.type) {
        case SET_AUTH:

            return ({
                ...state,
                ...action.authData,
                isAuth: true
            })

        default:
            return state
    }
}

export const setAuthUserData = (id, email,login) => ({type: SET_AUTH, authData: {id, email,login}});

export default authReducer