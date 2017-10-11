import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {ApiService} from "../../../shared/services/api.service";

/**
 * API Constants
 */
const LOGIN_ENDPOINT: string = 'login';
const REGISTER_ENDPOINT: string = 'register';

/**
 * Storage Constants
 */
const USER_STORAGE_KEY = "user";
const ACCESS_TOKEN_STORAGE_KEY = "Authorization";

@Injectable()
export class AuthService {

  constructor(private apiService: ApiService) {}

  login(email: string, password: string) {
    return new Observable(observer => {
      return this.apiService.post(LOGIN_ENDPOINT, {
        email: email,
        password: password
      }).subscribe((response) => {

        let user = response.user;
        let accessToken = response.token;
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY,accessToken);
        observer.next(response);

      }, (err) => {
        let resError = err && err.errorMessage ? err.errorMessage : 'Error';
        return observer.error({error: resError});
      });
    });
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    return new Observable(observer => {
      return this.apiService.post(REGISTER_ENDPOINT, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }).subscribe((response) => {

        let user = response.user;
        let accessToken = response.token;

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY,accessToken);
        
        observer.next(response);

      }, (err) => {
        let resError = err && err.errorMessage ? err.errorMessage : 'Error';
        return observer.error({error: resError});
      });
    });
  }

  logout() {
    return new Observable(observer => {

      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);

      return observer.next({});
    });
  }

  checkAuth() {
    return new Observable(observer => {
      try {
        let user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
        let accessToken =  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
        return user ? observer.next({user, accessToken}) : observer.next(null);
      }
      catch(e) {
        return observer.error({error: e});
      }
    });
  }
}