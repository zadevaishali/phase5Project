import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SignupUser } from "../model/signup-user.model";
import { User } from "../model/user.model";

@Injectable({providedIn:'root'})
export class UserServices
{
    private hostUrl = environment.apiUrl;

    constructor() {}
  
    public createUser(
      username: string,
      emailId: string,
      password: string,
      mobileNumber: string
    ): SignupUser {
      let user = new SignupUser();
      user.username = username;
      user.emailId = emailId;
      user.password = password;
      user.mobileNumber = mobileNumber;
      user.role = 'role_user';
      return user;
    }
    public addUserToLocalCache(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
      }
    
      public getUserFromLocalCache(): User[] {
        if (localStorage.getItem('users')) {
          return JSON.parse(localStorage.getItem('user'));
        }
        return null;
      }
    
}