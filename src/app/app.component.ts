import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {ApiService} from "./services/api.service";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private apiService: ApiService) {

        platform.ready().then(() => {
            splashScreen.show();
            if (!localStorage.getItem('contacts') && !localStorage.getItem('favouriteContacts')) {
                this.apiService.getPhoneBookData().subscribe(data => {
                    localStorage.setItem('contacts', JSON.stringify(data));
                    splashScreen.hide();
                    statusBar.styleDefault();
                });
            } else {
                splashScreen.hide();
                statusBar.styleDefault();
            }
        });
    }
}

