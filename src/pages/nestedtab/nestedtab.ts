import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AbouttabPage } from './about/abouttab';
import { SubtabPage } from './subtab/subtab';

@IonicPage()
@Component({
  selector: 'page-nestedtab',
  templateUrl: 'nestedtab.html',
})
export class NestedtabPage {

  tab1Root = AbouttabPage;
  tab2Root = SubtabPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NestedtabPage');
  }

}
