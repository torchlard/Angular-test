import {Injectable} from '@angular/core'
import {HttpEvent, HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token")
    console.log('idToken', idToken);

    if (idToken){
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken)
      })
      return next.handle(cloned)
    } else {
      return next.handle(req)
    }
  }
}