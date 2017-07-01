import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageManupulationPage } from './image-manupulation';

import { ImageListPage } from '../image-manupulation/image-list/image-list';
import { CaptureImageCameraPage } from './capture-image-camera/capture-image-camera'
import { SingleImageSelectPage } from './single-image-select/single-image-select'
import { MultiImageSelectPage } from './multi-image-select/multi-image-select'
@NgModule({
  declarations: [
    ImageManupulationPage,
    CaptureImageCameraPage,
    SingleImageSelectPage,
    MultiImageSelectPage,
    ImageListPage
  ],
  imports: [
    IonicPageModule.forChild(ImageManupulationPage),
  ],
  exports: [
    ImageManupulationPage
  ],
  entryComponents: [
    ImageManupulationPage,
    CaptureImageCameraPage,
    SingleImageSelectPage,
    MultiImageSelectPage,
    ImageListPage
  ]
})

export class ImageManupulationPageModule {}
