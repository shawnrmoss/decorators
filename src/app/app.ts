/*
 * Angular 2 decorators and services
 */
import {Component, ElementRef, OnInit} from 'angular2/core';
//import {Component, ElementRef, OnDestroy, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS, RouterLink,RouterOutlet} from 'angular2/router';


import {AuthService} from './services/auth.service';

import {Header} from './components/header/header';
import {Sidebar} from './components/sidebar/sidebar';

import {Home} from './views/home/home';

import '../assets/scss/main.scss';
import './app.scss';
let template = require('./app.html');

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Header, Sidebar],
    template: template
})
@RouteConfig([
    { path: '/', component: Home, name: 'HomePage' },
    
    { path: '/**', redirectTo: ['HomePage'] }
])
export class App implements OnInit {
    public loggedOn: boolean;

    constructor(private auth: AuthService,
        private element: ElementRef) {
        this.loggedOn = auth.isAuthenticated();
    }

    ngOnInit() {
        this.resize();
    }

    onResize(event) {
        this.resize();
    }

    resize() {
        let height = window.innerHeight;
        //header = 75, padding around wrapper 10
        height = height - 105;
        //Aside

        this.element.nativeElement.children[0].children[1]
            .childNodes[1].style.minHeight = height + 'px';
        this.element.nativeElement.children[0].children[1]
            .childNodes[1].style.maxHeight = height + 'px';
        //Main
        this.element.nativeElement.children[0].children[1]
            .childNodes[3].style.minHeight = height + 'px';
        this.element.nativeElement.children[0].children[1]
            .childNodes[3].style.maxHeight = height + 'px';
    }
}


