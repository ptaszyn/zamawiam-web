import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signInUrl = 'http://localhost:8080/api/auth/signin';
  private signUpUrl = 'http://localhost:8080/api/auth/signup';

  constructor(private http: HttpClient) {
  }

  signIn(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.signInUrl, credentials, httpOptions);
  }

  signUp(info: LoginRequest): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
  }
}
