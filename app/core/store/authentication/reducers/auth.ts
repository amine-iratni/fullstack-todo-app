import {tassign} from 'tassign';
import * as auth from '../actions/auth';

export interface State {
  tokenCheckComplete: boolean;
  isLoggedIn: boolean;
  inProgress: boolean;
  accessToken: string | null;
  user: any;
  error: null;
}

export const initialState: State = {
  tokenCheckComplete: false,
  isLoggedIn: false,
  inProgress: false,
  accessToken: null,
  user: null,
  error: null,
};


export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {

    /**
     * --------------------------------------------------
     * Check Authentication Actions
     * --------------------------------------------------
     */

    case auth.CHECK_AUTH: {
      return tassign(state, {
        tokenCheckComplete: false,
        isLoggedIn: false,
        accessToken: null,
        inProgress: true,
        error: null,
      });
    }

    case auth.CHECK_AUTH_SUCCESS: {
      return tassign(state, {
        tokenCheckComplete: true,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        inProgress: false
      });
    }

    case auth.CHECK_AUTH_SUCCESS_NO_USER: {
      return tassign(state, {
        tokenCheckComplete: true,
        isLoggedIn: false,
        inProgress: false
      });
    }

    case auth.CHECK_AUTH_FAILED: {
      return tassign(state, {
        tokenCheckComplete: true,
        isLoggedIn: false,
        inProgress: false
      });
    }

    /**
     * --------------------------------------------------
     * Login Actions
     * --------------------------------------------------
     */

    case auth.LOGIN: {
      return tassign(state, {
        inProgress: true,
        isLoggedIn: false,
        tokenCheckComplete: false,
        error: null
      });
    }

    case auth.LOGIN_SUCCESS: {
      return tassign(state, {
        inProgress: false,
        isLoggedIn: true,
        tokenCheckComplete: true,
        accessToken: action.payload.accessToken
      });
    }

    case auth.LOGIN_FAILED: {
      return tassign(state, {
        inProgress: false,
        isLoggedIn: false,
        tokenCheckComplete: true,
        error: action.payload.error,
        accessToken: null
      });
    }

    /**
     * --------------------------------------------------
     * Logout Actions
     * --------------------------------------------------
     */

    case auth.LOGOUT: {
      return tassign(state, {inProgress: true});
    }

    case auth.LOGOUT_SUCCESS: {
      return initialState;
    }

    case auth.LOGOUT_FAILED: {
      return tassign(state, {inProgress: false, error: action.payload.error});
    }

    /**
     * --------------------------------------------------
     * Register Actions
     * --------------------------------------------------
     */

    case auth.REGISTER: {
        return tassign(state, {
          inProgress: true,
          isLoggedIn: false,
          tokenCheckComplete: false,
          error: null
        });
      }
  
      case auth.REGISTER_SUCCESS: {
        return tassign(state, {
          inProgress: false,
          isLoggedIn: true,
          tokenCheckComplete: true,
          accessToken: action.payload.accessToken
        });
      }
  
      case auth.REGISTER_FAILED: {
        return tassign(state, {
          inProgress: false,
          isLoggedIn: false,
          tokenCheckComplete: true,
          error: action.payload.error,
          accessToken: null
        });
      }

    case auth.RESET_VIEW_STATE: {
      return tassign(state, {
        inProgress: false,
        error: null
      });
    }

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.isLoggedIn;
export const getUser = (state: State) => state.user;
export const getError = (state: State) => state.error;
export const getInProgress = (state: State) => state.inProgress;
export const getAccessToken = (state: State) => state.accessToken;