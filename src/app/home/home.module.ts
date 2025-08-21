import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe.pipe';
import { ShareButtonDirective } from 'ngx-sharebuttons';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShareButtonDirective
  ]
})
export class HomeModule { }
