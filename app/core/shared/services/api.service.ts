import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

const ACCESS_TOKEN_STORAGE_KEY = "Authorization";  

@Injectable()
export class ApiService {

  private contentType = {'Content-Type': 'application/json'};
  
  /**
   * @type {string}
   */
  private apiEndpoint: string = "http://localhost:3000";
  /**
   * @param {Http} http
   * @param {Router} router
   */
  constructor(private http: Http) {
  }

  /**
   * @returns {Headers}
   */
  public createAuthorizationHeader() {
    let headers = new Headers(this.contentType);
    let key = ACCESS_TOKEN_STORAGE_KEY;

    let token = localStorage.getItem(key);

    if (token !== null) {
      headers.append(key, token);
    }

    return headers;
  }

  /**
   * @param {string} path
   *
   * @returns {Observable<any>}
   */
  public get(path: string): Observable<any> {

    let endpoint = `${this.apiEndpoint}/${path}`;
    let headers = this.createAuthorizationHeader();

    let options = new RequestOptions({ headers: headers }); 

    return this.http
      .get(`${endpoint}`, options)
      .map(res => this.extractData(res))
      .catch(this.handleError.bind(this));
  }

  /**
   * @param {string} path
   * @param body
   *
   * @returns {Observable<any>}
   */
  public post(path: string, body: any): Observable<any> {

    let endpoint = `${this.apiEndpoint}/${path}`;
    let headers = this.createAuthorizationHeader();
    let options = new RequestOptions({ headers: headers });    

    return this.http
      .post(`${endpoint}`, body, options)
      .map(res => this.extractData(res))
      .catch(this.handleError.bind(this));
  }

  /**
   * @param {string} path
   * @param body
   *
   * @returns {Observable<any>}
   */
  public put(path: string, body: any): Observable<any> {

    let endpoint = `${this.apiEndpoint}/${path}`;
    let headers = this.createAuthorizationHeader();
    let options = new RequestOptions({ headers: headers });    

    return this.http
      .put(`${endpoint}`, body, options)
      .map(res => this.extractData(res))
      .catch(this.handleError.bind(this));
  }

  /**
   * @param {string} path
   * @param body
   *
   * @returns {Observable<any>}
   */
  public patch(path: string, body: any): Observable<any> {

    let endpoint = `${this.apiEndpoint}/${path}`;
    let headers = this.createAuthorizationHeader();
    let options = new RequestOptions({ headers: headers });    

    return this.http
      .patch(`${endpoint}`, body, options)
      .map(res => this.extractData(res))
      .catch(this.handleError.bind(this));
  }

  /**
   * @param {string} path
   *
   * @returns {Observable<any>}
   */
  public delete(path: string): Observable<any> {

    let endpoint = `${this.apiEndpoint}/${path}`;
    let headers = this.createAuthorizationHeader();
    let options = new RequestOptions({ headers: headers });    

    return this.http
      .delete(`${endpoint}`, options)
      .map(res => this.extractData(res))
      .catch(this.handleError.bind(this));
  }

  /**
   * @param {Response} res
   * @param {boolean} toJSON
   *
   * @returns {any}
   */
  private extractData(res: Response, toJSON: boolean = true) {

    if (!toJSON) {
      return res;
    }

    try {
      return res.json()
    }
    catch (e) {
      return {};
    }
  }

  /**
   * @param {Response} error
   *
   * @returns {ErrorObservable}
   */
  private handleError(error: Response) {
        
    let err = error;
  
    if (error.status === 401) {
      // localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      return Observable.throw({
        error: 'Credentials are incorrect'
      });
    } else if (error.status === 400) {
      return Observable.throw({
        error: err
      });
    }
    return Observable.throw(err);
  }

}