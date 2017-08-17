import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import { CommonController } from '../../providers/CommonController';
import { ProductListProvider } from '../../providers/product-list/product-list';

import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';

/**
 * Generated class for the FileProcessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-file-process',
  templateUrl: 'file-process.html',
})
export class FileProcessPage {

  public mSelectFilePath: string = "";
  public mSelectFileName: string = "";
  public mListPermissions = [
    this.androidPermissions.PERMISSION.CAMERA,
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.INTERNET
  ];
  public fileTransfer: TransferObject = this.transfer.create();

  public options: any = {
    "title": "myPDF"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public commonCtrl: CommonController,
    public androidPermissions: AndroidPermissions,
    public fileChooser: FileChooser,
    public file: File,
    public filePath: FilePath,
    public transfer: Transfer,
    public document: DocumentViewer,
    public productListProvider: ProductListProvider) {
  }

  openImageSelector() {
    if (this.commonCtrl.isRunOnMobileDevice()) {
      this.requestFileReadPermission();
    } else {
      this.commonCtrl.showToast("Camera plugin does not work in browser.", "bottom", 3000, true, "Ok", true);
    }
  }

  requestFileReadPermission() {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(success => {
        if (success.hasPermission) {
          this.openFileChosser();
        }
      }, error => {
        console.log(error);

        this.commonCtrl.showToast(error, "bottom", 3000, true, "Ok", true);
      });
  }

  requestMultiplePermission() {
    this.androidPermissions.requestPermissions(this.mListPermissions)
      .then(successs => {
        this.handleMultipleRequest();
      }, error => {
        console.log(error);

        this.commonCtrl.showToast(error, "bottom", 3000, true, "Ok", true);
      });
  }


  handleMultipleRequest() {
    console.log(this.mListPermissions);

    for (let i = 0; i < this.mListPermissions.length; i++) {
      this.androidPermissions.checkPermission(this.mListPermissions[i])
        .then(success => {
          console.log(this.mListPermissions[i] + " : " + success.hasPermission);
        }, error => {
          console.log(error);
        });
    }
  }


  getFiles(element) {
    console.log(element.target.files);
    console.log(element.target.files[0]);
    this.uploadFileSimple(element.target.files[0]);
  }

  openFileChosser() {
    this.fileChooser.open().then(resultData => {
      // console.log(resultData);

      this.filePath.resolveNativePath(resultData)
        .then(filePath => {
          // console.log(filePath);

          let mFilePath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let mFileName = filePath.substring(filePath.lastIndexOf('/') + 1);
          let mFileExt = filePath.substring(filePath.lastIndexOf('.') + 1);
          this.copyFileToLocalDir(mFilePath, mFileName, mFileExt);
        });
    }).catch(error => {
      console.log(error);

      this.commonCtrl.showToast(error, "bottom", 3000, true, "Ok", true);
    });
  }

  public fileFullPath(fileName) {
    if (fileName === null) {
      return '';
    } else {
      return this.file.dataDirectory + fileName;
    }
  }

  copyFileToLocalDir(filePath, fileName, fileExtension) {
    this.file.copyFile(filePath, fileName, this.file.dataDirectory, fileName).then(success => {
      this.mSelectFileName = fileName;
      this.mSelectFilePath = this.fileFullPath(fileName);

      console.log("filePath : " + this.mSelectFilePath);
      console.log("fileName : " + this.mSelectFileName);
      console.log("fileExtension  : " + this.mSelectFilePath.substring(this.mSelectFilePath.lastIndexOf('.') + 1));

      if (fileExtension == "pdf") {
        this.openPdfFile();
      }
    }, error => {
      this.commonCtrl.showToast('Error while storing file.', "bottom", 3000, true, "Ok", true);
    });
  }

  uploadFileSimple(filename) {
    console.log(filename);
    //let UPLOAD_URL = this.commonCtrl.API_URL_UPLOADS;
    //var b = new Blob([filename], {type: "image/*;charset=utf-8"});
    var fd = new FormData();
    fd.append('file1', filename);

    this.productListProvider.postMethodUpload(fd).then(success => {
      console.log("success" + success);
    }, err => {
      console.log("success" + err);
    }).catch(e => {
      console.log("success" + e);
    })
  }
  uploadFile() {
    let UPLOAD_URL = this.commonCtrl.API_URL_UPLOADS;

    let uploadParams = {};

    let uploadOptions = {
      fileKey: "profile_image",
      fileName: this.mSelectFileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: uploadParams
    };

    this.commonCtrl.showLoading('Uploading...');

    // Use the FileTransfer to upload the image
    this.fileTransfer.upload(this.mSelectFilePath, UPLOAD_URL, uploadOptions).then(data => {
      this.commonCtrl.hideLoading();

      if (data != null) {
        console.log(data);

        let resp = JSON.parse(data.response);
        this.commonCtrl.showToast(resp.message, "bottom", 3000, true, "Ok", true);
      }
    }, err => {
      console.log(err);

      this.commonCtrl.hideLoading();
      this.commonCtrl.showToast('Error while uploading file.', "bottom", 3000, true, "Ok", true);
    });

    this.fileTransfer.onProgress(progressEvent => {
      // console.log(progressEvent);

      if (progressEvent.lengthComputable) {
        this.commonCtrl.showLoading(Math.floor(progressEvent.loaded / progressEvent.total * 100) + '% Uploading...');
        console.log("Progress : " + Math.floor(progressEvent.loaded / progressEvent.total * 100));
      }
    });
  }

  openPdfFile() {
    this.document.viewDocument(this.mSelectFilePath, 'application/pdf', this.options);
  }

}
