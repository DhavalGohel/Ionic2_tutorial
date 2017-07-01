import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

// Native Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FileChooser } from '@ionic-native/file-chooser';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DocumentViewer } from '@ionic-native/document-viewer';

import { ProductListProvider } from '../providers/product-list/product-list';
import { CommonController } from '../providers/CommonController';


// Components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AlertPage } from '../pages/alert/alert';
import { CheckBoxPage } from '../pages/checkbox/checkbox';
import { SlideBoxPage } from '../pages/slide-box/slide-box';

import { ButtonPage } from '../pages/buttons/button';
import { BasicButtonPage } from '../pages/buttons/basic-button/basic-button';
import { IconsButtonPage } from '../pages/buttons/icons-button/icons-button';
import { ButtonComponentsPage } from '../pages/buttons/button-components/button-components';
import { ModalPage,ModalContentPage } from '../pages/modal/modal';

import { ListPage }  from '../pages/list/list'
import { StaticListPage }  from '../pages/list/static-list/list'
import { ListHttpPage }  from '../pages/list/list-http/list-http'
import { ListHttpRefreshPage }  from '../pages/list/list-http-refresh/list-http-refresh'
import { ListItemDetailPage }  from '../pages/list/list-item-detail/list-item-detail'

import { SegmentPage }  from '../pages/segment/segment'
import { FileProcessPage }  from '../pages/file-process/file-process'

import { PopoverPage,PopoverContentPage }  from '../pages/popover/popover'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AlertPage,
    CheckBoxPage,
    ButtonPage,
    BasicButtonPage,
    IconsButtonPage,
    ButtonComponentsPage,
    SlideBoxPage,
    ModalPage,
    ModalContentPage,
    ListPage,
    StaticListPage,
    ListHttpPage,
    ListHttpRefreshPage,
    ListItemDetailPage,
    SegmentPage,
    FileProcessPage,
    PopoverPage,
    PopoverContentPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      tabsHighlight: true,
      tabsPlacement: 'top',
      tabsHideOnSubPages: true
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AlertPage,
    CheckBoxPage,
    ButtonPage,
    BasicButtonPage,
    IconsButtonPage,
    ButtonComponentsPage,
    SlideBoxPage,
    ModalPage,
    ModalContentPage,
    ListPage,
    StaticListPage,
    ListHttpPage,
    ListHttpRefreshPage,
    ListItemDetailPage,
    SegmentPage,
    FileProcessPage,
    PopoverPage,
    PopoverContentPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductListProvider,
    CommonController,
    File,
    FilePath,
    Transfer,
    PhotoViewer,
    FileChooser,
    AndroidPermissions,
    DocumentViewer,
  ]
})
export class AppModule {}
