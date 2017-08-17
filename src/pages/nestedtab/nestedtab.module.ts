import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NestedtabPage } from './nestedtab';
import { SubtabPage } from './subtab/subtab';
import { AbouttabPage } from './about/abouttab';
import { SubtabPage1 } from './subtab/subtab1/subtab1'
import { SubtabPage2 } from './subtab/subtab2/subtab2'

@NgModule({
  declarations: [
    NestedtabPage,
    AbouttabPage,
    SubtabPage,
    SubtabPage1,
    SubtabPage2
  ],
  imports: [
    IonicPageModule.forChild(NestedtabPage),
  ],
  exports: [
    NestedtabPage
  ],
  entryComponents: [
    NestedtabPage,
    AbouttabPage,
    SubtabPage,
    SubtabPage1,
    SubtabPage2
  ]
})
export class NestedtabPageModule {}
