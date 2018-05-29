import { Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks';
import { KeycloakService } from '../../keycloak-service/keycloak.service'
import {BrowserTab} from "@ionic-native/browser-tab";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private navParams: NavParams,
              public keycloak: KeycloakService,
              private browserTab: BrowserTab,
              private deepLinks: Deeplinks) {
    browserTab.close();


  }

}
