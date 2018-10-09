import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule} from '@angular/http';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { EmailComposer } from '@ionic-native/email-composer';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ApiService} from "./services/api.service";
import {NativeStorage} from "@ionic-native/native-storage";
import { CallNumber } from '@ionic-native/call-number';
import {ContactInfoPage} from "../pages/contact-info/contact-info";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ContactInfoPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ContactInfoPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        CallNumber,
        EmailComposer,
        NativeStorage,
        ApiService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
