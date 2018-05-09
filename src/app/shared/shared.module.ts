import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { SharedService } from './services/shared.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
     FormErrorComponent
     
  ],
  declarations: [
    FormErrorComponent
  ],
  providers: [SharedService]
})
export class SharedModule { }
