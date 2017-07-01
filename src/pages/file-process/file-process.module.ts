import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileProcessPage } from './file-process';

@NgModule({
  declarations: [
    FileProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(FileProcessPage),
  ],
  exports: [
    FileProcessPage
  ]
})
export class FileProcessPageModule {}
