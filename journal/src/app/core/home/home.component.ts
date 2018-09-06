import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TextFieldComponent } from 'src/app/core/text-field/text-field.component';
import { EditorServiceService } from '../../shared/editor-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%,0,0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class HomeComponent implements OnInit {

  string2: any;
  str: String;
  no: number = 4;
  title: any;
  obj = new Object({
    title: String,
    content: String
  });
  arr: Object[] = [];

  constructor(private router: Router,
    private editorService: EditorServiceService) {
    let name = sessionStorage.getItem("name");
    this.str = name;
    this.editorService.geteditorContent(name).
      subscribe(res => {
        for (let i in res) {
          var newObj = new Object();
          let info = res[i];
          let title = info["title"];
          let content = info["content"];
          let date = info["date"];
          newObj["title"] = title;
          newObj["content"] = info["content"];
          newObj["date"] = date;
          newObj["id"] = info["_id"];
          this.arr.push(newObj);
          // console.log("id:",info["_id"]);
        }
        console.log("---------final data of obj-----------", this.arr);
        console.log("0th object data:", this.arr[0]);
      });
  }

  ngOnInit() {
    console.log("This is the string:", this.str);
    this.editorService.cast.subscribe(obj => { });
  }

  //for the menu option in the home component 
  menuState: string = 'out';

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  readMore(obj) {
    // console.log("In read more!");
    //console.log(id);
    this.editorService.ReadMore(obj);
  }
}
