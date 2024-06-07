import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Generic GET request
   * @param url The URL of the request
   * @param options The options of the request
   * @returns The response of the request
   */
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  /**
   * Generic POST request
   * @param url The URL of the request
   * @param body The body of the request
   * @param options The options of the request
   * @returns The response of the request
   */
  post<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  /**
   * Generic PUT request
   * @param url The URL of the request
   * @param body The body of the request
   * @param options The options of the request
   * @returns The response of the request
   */
  put<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  /**
   * Generic DELETE request
   * @param url The URL of the request
   * @param options The options of the request
   * @returns The response of the request
   */
  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
