import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    return false
  }

  constructor() { }
}
