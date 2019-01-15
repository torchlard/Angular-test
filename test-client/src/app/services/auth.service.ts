import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post<User>('/api/login', {email, password}).shareReplay()
      
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

