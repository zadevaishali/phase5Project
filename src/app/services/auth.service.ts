import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt/';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomApiResponse } from '../model/api-response';
import { SignupUser } from '../model/signup-user.model';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public hostUrl = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(loginData): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.hostUrl}/login`, loginData, {
      observe: 'response',
    });
  }

  public register(user: SignupUser): Observable<CustomApiResponse> {
    return this.http.post<CustomApiResponse>(`${this.hostUrl}/signup`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
      console.log('user is not verified');
      return false;
    } else {
      this.logOut();
      return false;
    }
  }
}
