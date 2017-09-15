import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, AlertController } from 'ionic-angular';
import { CommonController } from '../../providers/CommonController';
import { ProductListProvider } from '../../providers/product-list/product-list';

@Component({
  selector: 'page-horizontals-vertical-block',
  templateUrl: 'horizontals-vertical-block.html'
})
export class HorizontalsVerticalBlock {
  public rows: any;
  public apiResult: any;

  public mClientContactList: any = [];
  public mMainProductBlocks: any = [];
  public mBrandBlocks: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public commonCtrl: CommonController,
    public productService: ProductListProvider) {
  }
  ionViewDidEnter() {
    this.getClientContactListData(true);
  }
  getItemValue(data) {
    console.log(data.title);
  }
  getClientContactListData(showLoader) {
    if (this.commonCtrl.hasConnection()) {
      if (showLoader) {
        this.commonCtrl.showLoading("Loading...");
      }

      this.productService.getHomeData("", 1).then(data => {


        if (data != null) {
          this.commonCtrl.hideLoading();

          this.apiResult = data;
          if (this.apiResult != null) {
            this.setHomeData(this.apiResult);
          } else {
            if (this.apiResult.error != null && this.apiResult.error != "") {
              this.commonCtrl.showAlertMsg("Error", this.apiResult.error);
            } else {
              this.commonCtrl.showAlertMsg("Error", "Network Error.");
            }
          }
        } else {
          this.commonCtrl.hideLoading();
          this.commonCtrl.showNativeToast("Network Error", "bottom", 3000);
        }
      }, error => {
        this.commonCtrl.hideLoading();
        this.commonCtrl.showAlertMsg("Error", "Network Error");
      });
    } else {
      this.commonCtrl.showAlertMsg("Internet", "No internet connection");
    }
  }

  setHomeData(data) {
    if (data.slider != null && data.slider.length > 0) {
      for (let i = 0; i < data.slider.length; i++) {
        this.mClientContactList.push(data.slider[i]);
      }
    }
    if (data.product != null && data.product.length > 0) {
      for (let i = 0; i < data.product.length; i++) {

        this.mMainProductBlocks.push(data.product[i]);
      }
    }
  }
}
