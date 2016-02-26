import { Component } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { AuthService } from '../../services/auth.service';

import './header.scss';

@Component({
    selector: 'header',
    template: require('./header.html'),
    directives: [RouterLink]
})
export class Header {
    public loggedInUsername: string;
    private permissions;

    constructor(private auth: AuthService,
        private router: Router) {

        if (auth.isAuthenticated()) {
            this.loggedInUsername = auth.getUsername();
            this.permissions = auth.getPermissions();
        }

    }

    onLogOff() {
        this.auth.logout();
        this.router.navigate(['LoginPage']);
    }

    userHasPermission(permission: String) {
        return this.auth.hasViewPermission(permission);
    }

}
