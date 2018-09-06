import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field/text-field.component';
//import { TextFieldComponent } from './text-field/text-field.component';
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
  //  FroalaEditorModule.forRoot(), 
  //  FroalaViewModule.forRoot(),
    EditorModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    TextFieldComponent
  ],
  declarations: [TextFieldComponent]      //TextFieldComponent
})
export class CoreModule { }
