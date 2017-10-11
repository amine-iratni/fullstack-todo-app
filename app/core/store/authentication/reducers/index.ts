import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth';
import * as fromRoot from '../../reducers';

export interface AuthState {
    status: fromAuth.State;
  }

export interface State extends fromRoot.State {
    auth: fromAuth.State;
}

export const reducers  = {
    status: fromAuth.reducer
  };

  export const selectAuthState = createFeatureSelector<AuthState>('auth');
  
  export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status 
  );
  
export const getLoggedIn = createSelector(selectAuthStatusState,fromAuth.getLoggedIn);
export const getAccessToken = createSelector(selectAuthStatusState,fromAuth.getAccessToken);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const getError = createSelector(selectAuthStatusState,fromAuth.getError);
export const getInProgress = createSelector(selectAuthStatusState,fromAuth.getInProgress);