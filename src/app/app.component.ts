import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProfilePage } from '../pages/profile/profile';
import { WelcomePage } from '../pages/welcome/welcome';

import { TranslateService } from '@ngx-translate/core'

import { KeycloakService } from '../keycloak-service/keycloak.service';
import {LoginPage} from "../pages/login/login";

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = WelcomePage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Welcome', component: WelcomePage },
    { title: 'Profile', component: ProfilePage }
  ];

  constructor(private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private deeplinks: Deeplinks,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    keycloak: KeycloakService) {

    this.initTranslate();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      console.log("init Keycloak");
      KeycloakService.init({ adapter: 'cordova-native', checkLoginIframe: false, responseMode: 'query'});
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.deeplinks.routeWithNavController(this.nav, {
        '/login': LoginPage,
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });
    })
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
