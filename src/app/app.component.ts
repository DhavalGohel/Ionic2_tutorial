import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AlertPage } from '../pages/alert/alert';
import { ButtonPage } from '../pages/buttons/button';
import { SlideBoxPage } from '../pages/slide-box/slide-box';
import { CheckBoxPage } from '../pages/checkbox/checkbox';
import { ModalPage } from '../pages/modal/modal';
import { ListPage }  from '../pages/list/list'
import { SegmentPage }  from '../pages/segment/segment'
import { FileProcessPage }  from '../pages/file-process/file-process'
import { PopoverPage }  from '../pages/popover/popover'
import { ImageManupulationPage } from '../pages/image-manupulation/image-manupulation';
import { NestedtabPage } from '../pages/nestedtab/nestedtab';
import { HorizontalsVerticalBlock } from '../pages/horizontals-vertical-block/horizontals-vertical-block';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Alert', component: AlertPage },
      { title: 'Button', component: ButtonPage },
      { title: 'Slide Box', component: SlideBoxPage },
      { title: 'CheckBox', component: CheckBoxPage },
      { title: 'Model', component: ModalPage },
      { title: 'List' , component : ListPage},
      { title : 'Segment', component : SegmentPage},
      { title : 'Popover', component  :PopoverPage},
      { title : 'File Manupulation', component  : FileProcessPage},
      { title : 'Image Manupulation', component  : ImageManupulationPage},
      { title : 'Nested Tab', component : NestedtabPage},
      { title : 'Horizantal Vertical', component : HorizontalsVerticalBlock}
    ];

    this.checkPageRedirection();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  checkPageRedirection() {
    this.storage.get('isTutorialShow').then((value) => {
      // console.log(value);

      if (value != null && !value) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = SlideBoxPage;
      }
    });
  }
}
