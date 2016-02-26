import { Injectable, EventEmitter } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Credential } from '../datatypes/credential';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    //private BASE_SERVICE_URL = 'http://localhost:65052/';
    private BASE_SERVICE_URL = 'http://summitapi.azurewebsites.net/';
    private token: string;
    private userInfo: any = {};
    private permissions: any = {};
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) { }

    public signIn(cred: Credential) {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'text/plain');

        let body = 'userName=' + cred.email + '&password=' + cred.password + '&grant_type=password';

        return this.http.post(this.BASE_SERVICE_URL + 'Token', body, {
            headers: headers
        })
            .map(res => {
                this.token = res.json().access_token;
                localStorage.setItem('jwt', this.token);
            });
    }

    public logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('expires');
        localStorage.removeItem('userName');
    }

    public isAuthenticated() {
        return localStorage.getItem('jwt') != null;
    }

    public getCustomerID() {
        return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).CustomerID;
    }

    public getUsername() {
        return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).DisplayName;
    }

    public getPermissions() {
        return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).Permissions;
    }

    public getRoles() {
        return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).roles;
    }

    public hasViewPermission(permission: String) {
        let hasPermission = this.jwtHelper
            .decodeToken(localStorage.getItem('jwt'))
            .Permissions.indexOf(permission) > -1;

        let hasGodPower = this.jwtHelper
            .decodeToken(localStorage.getItem('jwt'))
            .Permissions.indexOf('Can_View_All') > -1;

        return hasPermission || hasGodPower;
    }

    public hasEditPermission(permission: String) {
        let hasPermission = this.jwtHelper
            .decodeToken(localStorage.getItem('jwt'))
            .Permissions.indexOf(permission) > -1;

        let hasGodPower = this.jwtHelper
            .decodeToken(localStorage.getItem('jwt'))
            .Permissions.indexOf('Can_Edit_All') > -1;

        return hasPermission || hasGodPower;
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }

}

