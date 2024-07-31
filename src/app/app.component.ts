import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MsgServiceService } from './services/msg-service.service';
import { SocketServiceService } from './services/socket-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'angular-websocket';
  form: FormGroup;
  messages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MsgServiceService,
    private socketService: SocketServiceService
  ) {
    this.form = this.formBuilder.group({
      message: ''
    })
  }

  ngOnInit(): void {
    this.socketService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  // submit(){
  //   this.messageService.create(this.form.getRawValue()).subscribe({
  //     next: (response : any) => {
  //       console.log(response);
  //     },

  //     error: (err: any) => {
  //       console.log(err);
  //     }
  //   })
  // }

  submit() {
    const message = this.form.value.message;
    if (message) {
      this.socketService.sendMessage(message);
      this.form.reset();
    }
  }
}
