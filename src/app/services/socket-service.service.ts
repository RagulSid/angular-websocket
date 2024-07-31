import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private socket = io("http://localhost:8082", {
    transports: ['websocket', 'polling']
  });

  constructor() {}

  getMessages(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
}
