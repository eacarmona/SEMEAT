// tslint:disable:no-bitwise
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '@app/core/model/token.model';
import { Role, User } from '@app/core/model/user.model';
import { Apollo } from 'apollo-angular';

const TOKEN_PREFIX = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenGetter: string = null;
  private _isAuthenticated = new BehaviorSubject(false);
  private _user = new BehaviorSubject(null);
  private _token = new BehaviorSubject('');

  private _isAdmin = new BehaviorSubject(false);
  private _isSpecialist = new BehaviorSubject(false);
  private _isStudent = new BehaviorSubject(false);

  constructor(
    private localStorageService: LocalStorageService,
    private apollo: Apollo
  ) {
    this.tokenGetter =  this.localStorageService.getItem(TOKEN_PREFIX);
    if (this.isLoggedIn()) {
      const token: Token = this.decodeToken(this.tokenGetter);
      this._token.next(this.tokenGetter);
      this._user.next(token.user);
      this._isAuthenticated.next(true);
    } else {
      this._token.next('');
      this._isAuthenticated.next(false);
    }
    this.setRoles();
  }

  public getToken(): string {
    return this.tokenGetter;
  }

  public getUser(): User {
    return this._user.getValue();
  }

  public getAsyncUser(): Observable<User> {
    return this._user.asObservable();
  }

  public getTokenAsync(): Promise<string> {
    return this._token.toPromise();
  }

  public getRoles(): Role[] {
    if (this._user.getValue()) {
      return this._user.getValue().roles;
    }
    return [];
  }

  public isAdmin(): Observable<boolean> {
    return this._isAdmin.asObservable();
  }

  public isSpecialist(): Observable<boolean> {
    return this._isSpecialist.asObservable();
  }

  public isStudent(): Observable<boolean> {
    return this._isStudent.asObservable();
  }

  public getTokenn(): Observable<string> {
    return this._token.asObservable();
  }

  public isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  public isLoggedIn(): boolean {
    if (!this.tokenGetter) {
      return false;
    }
    if (!this.isTokenExpired(this.tokenGetter)) {
      return true;
    }
    return false;
  }

  private setRoles(): void {
    if (this.getRoles().some(value => value.name === 'Administrador') && this.isLoggedIn()) {
      this._isAdmin.next(true);
    } else {
      this._isAdmin.next(false);
    }
    if (this.getRoles().some(value => value.name === 'Especialista') && this.isLoggedIn()) {
      this._isSpecialist.next(true);
    } else {
      this._isSpecialist.next(false);
    }
    if (this.getRoles().some(value => value.name === 'Estudiante') && this.isLoggedIn()) {
      this._isStudent.next(true);
    } else {
      this._isStudent.next(false);
    }
  }

  public login(body: any): void {
    this.localStorageService.setItem(TOKEN_PREFIX, body.token);
    this.tokenGetter = body.token;
    this._user.next(body.user);
    this._isAuthenticated.next(true);
    this.setRoles();
  }

  public register(body: any): void {
    this.localStorageService.setItem(TOKEN_PREFIX, body.token);
    this._user.next(body.user);
    this._isAuthenticated.next(true);
    this.setRoles();
  }

  public profile(body: any): void {
    this.localStorageService.setItem(TOKEN_PREFIX, body.token);
    this._user.next(body.user);
    this._isAuthenticated.next(true);
    this.setRoles();
  }

  public logout(): void {
    this.localStorageService.removeItem(TOKEN_PREFIX);
    this._isAuthenticated.next(false);
    this._user.next(null);
    this.setRoles();

    // reset the store after that
    this.apollo.getClient().resetStore();
  }

  private urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        // tslint:disable-next-line:no-string-throw
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }

  // credits for decoder goes to https://github.com/atk
  private b64decode(str: string): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
      throw new Error(
        `'atob' failed: The string to be decoded is not correctly encoded.`
      );
    }

    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      (
        (bs = bc % 4 ? bs * 64 + buffer : buffer),
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4
      )
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(
      Array.prototype.map
        .call(this.b64decode(str), (c: any) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  public decodeToken(token: string = this.getToken()) {
    if (token === null) {
      return null;
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error(`The inspected token doesn\'t appear to be
      a JWT. Check to make sure it has three parts and see https://jwt.io for more.`);
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token.');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string = this.getToken()): Date | null {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string = this.getToken(), offsetSeconds?: number): boolean {
    if (token === null || token === '') {
        return true;
    }

    const date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return true;
    }

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }

}
