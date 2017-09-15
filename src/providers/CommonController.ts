import { Injectable } from '@angular/core';
import { LoadingController, ToastController ,Platform,AlertController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';


@Injectable()
export class CommonController {
  public API_URL_LIST = "https://randomuser.me/api/";

  // public API_PRODUCT_URL = "https://www.addtobuy.com/api/";
  public API_PRODUCT_URL = "http://a2b.172.104.57.92.nip.io/api/";

  public API_URL_UPLOADS = "http://192.168.1.67:8400";
  // public API_URL_UPLOADS = "http://a2b.172.104.57.92.nip.io/api/updateprofile";

  public loader;
  public toast;

  constructor(public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public network: Network,
    private nativeToastCtrl: Toast,
    public alertCtrl: AlertController) {
  }

  hasConnection() {
    if (this.isRunOnMobileDevice()) {
      if (this.network.type == "unknown" || this.network.type == null || this.network.type == "none") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  showLoading(message) {
    this.loader = this.loadingCtrl.create({
      content: message
      // spinner: 'hide',
      // duration: 3000,
      // showBackdrop: true,
      // enableBackdropDismiss: true,
      // dismissOnPageChange: true
    });

    this.loader.onDidDismiss(() => {
      // console.log('Dismissed loading');
    });

    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  showToast(msg, position, duration, isShowCloseBtn, closeButtonText, hideOnPageChange) {
    if (isShowCloseBtn) {
      this.toast = this.toastCtrl.create({
        message: msg,
        position: position,
        duration: duration,
        showCloseButton: isShowCloseBtn,
        closeButtonText: closeButtonText,
        dismissOnPageChange: hideOnPageChange
      });
    } else {
      this.toast = this.toastCtrl.create({
        message: msg,
        position: position,
        duration: duration,
        dismissOnPageChange: hideOnPageChange
      });
    }

    this.toast.present();
  }

  hideToast() {
    this.toast.dismiss();
  }

  showAlertMsg(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });

    alert.present();
  }

  showNativeToast(msg, position, duration) {
    if (this.isRunOnMobileDevice()) {
      this.toast.show(msg, duration, position).subscribe(
        toast => {
          console.log(toast);
        });
    } else {
      this.showToast(msg, position, duration, true, "ok", true);
    }
  }



  isRunOnMobileDevice() {
    return this.platform.is('mobile') ? true : false;
  }

  isRunOnAndroid() {
    return this.platform.is('android') ? true : false;
  }
}
