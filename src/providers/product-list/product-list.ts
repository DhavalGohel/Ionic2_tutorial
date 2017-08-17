import { Injectable } from '@angular/core';
import { Http , RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {  CommonController } from "../CommonController";
/*
  Generated class for the ProductListProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductListProvider {
  constructor(public http: Http,
  public commonCtrl: CommonController) {
    console.log('Hello ProductListProvider Provider');
  }

  load() {
    return new Promise(resolve => {
      this.http.get(this.commonCtrl.API_URL_LIST+'?results=100')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.results);
        }, (error) => {
          // console.log(error);
          // resolve(error.json());

          let resp = { "status": false };
          resolve(resp);
        });
    });
  }

  postMethod(param?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    return new Promise(resolve => {
      this.http.post(this.commonCtrl.API_URL_LIST, param, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          resolve(err.json());
        });
    });
  }

  postMethodUpload(param?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    return new Promise(resolve => {
      this.http.post(this.commonCtrl.API_URL_UPLOADS, param, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          resolve(err.json());
        });
    });
  }

  loadProductData(page: number) {
    return new Promise(resolve => {
      this.http.get(this.commonCtrl.API_PRODUCT_URL + "products/womens-apparel/womens-apparel-topwear/tops-tunics?page=" + page)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (error) => {
          let resp = { "isError":true };
          resolve(resp);
        });
    });
  }

}
