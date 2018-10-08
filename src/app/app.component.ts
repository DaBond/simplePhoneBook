import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NativeStorage} from '@ionic-native/native-storage';

import {HomePage} from '../pages/home/home';
import {ApiService} from "./services/api.service";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage: NativeStorage, private apiService: ApiService) {

        platform.ready().then(() => {
            splashScreen.show();
            this.apiService.getPhoneBookData().subscribe(data => {
                // this.nativeStorage.setItem('contacts', data)
                //     .then(
                //         () => console.log('Stored item!'),
                //         error => console.error('Error storing item', error)
                //     );
                localStorage.setItem('contacts', JSON.stringify(data));
                splashScreen.hide();
                statusBar.styleDefault();
            });
        });
    }
}

