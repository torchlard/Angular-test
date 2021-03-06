import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { shareReplay } from 'rxjs/operators'
import * as moment from 'moment'
import { Observable, pipe } from 'rxjs';
import {tap } from 'rxjs/operators'
import { headersToString } from 'selenium-webdriver/http';

class Token {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<Token>{
    // const headers = new Headers()
    // headers.append("Access-Control-Allow-Origin", '*')
    console.log(email, password);
    
    return this.http.post<Token>('http://localhost:4001/api/login', {email, password} )
      .pipe(
        tap(x => this.setSession(x)),
        shareReplay()
      )
  }

  private setSession(authResult){
    const expiresAt = moment().add(authResult.expiresIn, 'second')
    console.log('set session', authResult);
    localStorage.setItem('id_token', authResult.token)
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
  }

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut(){
    return moment().isBefore(this.getExpiration())
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at")
    const expiresAt = JSON.parse(expiration)

    return moment(expiresAt)
  }
  
  
}


// export function getClientSetting(): UserManagerSettings {
//   return {
//     // url of our openID connect provider
//     authority: 'http://localhost:5555/',
//     // client application identifier
//     client_id: 'angular_spa',
//     // client registered uri
//     redirect_uri: 'http://localhost:4200/auth-callback',
//     // registered URI that openID connect provider redirect once user logout
//     post_logout_redirect_uri: 'http://localhost:4200/',
//     // token type requested
//     response_type: 'id_token token',
//     scope: 'openid profile api1',
//     // prevent protocol level claim such as nbf,iss,at_hash,nonce
//     filterProtocolClaims: true,
//     // allow lib to call openID provider user info using access token
//     loadUserInfo: true
//   }
// }

