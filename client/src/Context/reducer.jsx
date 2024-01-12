import { decodeToken } from 'react-jwt';
export const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN": {
            const decodedUser = decodeToken(action.token); 
            return {
                ...state,
                token: action.token,
                user: decodedUser,
                role: decodedUser ? decodedUser.role : null
            }
        }
        case "USER_LOGOUT": {

            return { ...state, token: undefined };
        }

        case "SET_USER": {
            return { ...state, users: action.formData }
        }

        default: {
            return state;
        }
    }
}