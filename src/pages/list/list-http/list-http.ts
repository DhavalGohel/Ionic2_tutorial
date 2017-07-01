import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductListProvider } from '../../../providers/product-list/product-list';

import { CommonController } from '../../../providers/CommonController';
import { ListItemDetailPage } from '../list-item-detail/list-item-detail';

@Component({
  selector: 'page-list-http',
  templateUrl: 'list-http.html',
  providers: [ProductListProvider]
})

export class ListHttpPage {
  public persons: any;
  public search_list: any;
  public count: any;
  public loader: any;
  public response: any;
  public showSearchBar: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productListProvider: ProductListProvider,
    public loadingCtrl: LoadingController,
    public commonCtrl: CommonController
  ) {
    this.count = 0;
    this.loadData();
  }
  loadData() {
    this.commonCtrl.showLoading("Loading...");

    this.productListProvider.load()
      .then(data => {
        this.commonCtrl.hideLoading();

        if (data != null) {
          this.response = data;

          if (this.response.length > 0) {
            this.persons = data;
            this.search_list = data;
          }
        } else {
          this.commonCtrl.showToast("Network Error.", "bottom", 3000, true, "Ok", true);
        }
      }).catch(error => {
        this.commonCtrl.showLoading("Loading...");
        this.commonCtrl.showToast("Network Error.", "bottom", 3000, true, "Ok", true);
      })
  }

  openDetailPage(person) {
    this.navCtrl.push(ListItemDetailPage, {
      'person': person
    });
  }

  searchData(ev) {
    var search_text = ev.target.value;

    if (search_text && search_text.trim != '') {
      if (this.search_list != null && this.search_list.length > 0) {
        this.persons = this.search_list.filter((item) => {
          return ((item.name.first.toLowerCase().indexOf(search_text.toLowerCase()) > -1)
          || (item.name.last.toLowerCase().indexOf(search_text.toLowerCase()) > -1)
          || (item.email.toLowerCase().indexOf(search_text.toLowerCase()) > -1));
        });
      }
    } else {
      this.persons = this.search_list;
    }
  }

  onClickSearchIcon() {
    this.showSearchBar = true;
  }

  onSearchCancel() {
    this.showSearchBar = false;
  }

  onBackPressed() {
    this.navCtrl.pop();
  }
}
