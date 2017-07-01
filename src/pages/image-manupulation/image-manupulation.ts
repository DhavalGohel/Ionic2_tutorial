import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CaptureImageCameraPage } from './capture-image-camera/capture-image-camera'
import { SingleImageSelectPage } from './single-image-select/single-image-select'
import { MultiImageSelectPage } from './multi-image-select/multi-image-select'
/**
 * Generated class for the ImageManupulationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-image-manupulation',
  templateUrl: 'image-manupulation.html',
})
export class ImageManupulationPage {
  public captureImageCameraPage: any = CaptureImageCameraPage;
  public singleImageSelectPage: any = SingleImageSelectPage;
  public multiImageSelectPage: any = MultiImageSelectPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageManupulationPage');
  }

}
