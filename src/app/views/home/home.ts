import {Component} from 'angular2/core';

let template = require('./home.html');

@Component({
    selector: 'home',
    directives: [],
    template: template
})
export class Home {

    public image: string;

    constructor() {
        this.image = './assets/img/languages.png';
    }
}
