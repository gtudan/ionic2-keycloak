import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../keycloak-service/keycloak.service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public keycloak: KeycloakService) {


  }

}
