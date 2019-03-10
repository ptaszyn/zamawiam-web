import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signInUrl = environment.baseUrl + '/auth/signin';
  private signUpUrl = environment.baseUrl + '/auth/signup';

  constructor(private http: HttpClient) {
  }

  signIn(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.signInUrl, credentials, httpOptions);
  }

  signUp(info: LoginRequest): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
  }
}
