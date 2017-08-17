import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { SubtabPage1 } from './subtab1/subtab1'
import { SubtabPage2 } from './subtab2/subtab2'

@Component({
  selector: 'page-subtab',
  templateUrl: 'subtab.html',
})
export class SubtabPage {

  subtab1Root: SubtabPage1;
  subtab2Root: SubtabPage2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NestedtabPage');
  }

}
