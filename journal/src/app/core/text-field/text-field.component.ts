import { Component, OnInit } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HomeComponent } from 'src/app/core/home/home.component';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';
import { FormsModule } from '@angular/forms';
import { EditorServiceService } from '../../shared/editor-service.service';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent {
  object: string;

  obj: any = {
    username: "",
    title: "",
    content: "",
    date: new Date()
  };

  constructor(
    private router: Router,
    private editorService: EditorServiceService) { }

  ngOnInit() {
    this.editorService.cast.subscribe(object => this.object = object);
    console.log("In onInit:", this.object);
    if(this.object["title"]!=null){
      console.log("Object is null");
      this.obj = this.object;
    }
 //   this.obj = this.object;
  }

  title = 'app';
  isDisabled = false;
  submitted = false;
  content2 = '<p>some content</p>';
  isEditingContent = false;

  editContent() {
    this.isEditingContent = !this.isEditingContent;
  }

  log({ event, editor }: any) {
    //console.log(event);
  }

  onSubmit() {
    this.submitted = !this.submitted;
    this.router.navigate(['/home']);
  }

  toDatabase({ event, editor }: any) {
    console.log(editor.getContent());
    var current_date = new Date();
    console.log(current_date);
    this.obj["username"] = sessionStorage.getItem("name");
    this.obj["date"] = current_date;
    this.editorService.editorContent(this.obj).
      subscribe(res => { });
  }

}





