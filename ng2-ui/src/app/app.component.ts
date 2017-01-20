import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //title = 'app works!';
  title = 'KHS - Trouble Maker';

  getEvents(tmp): void {
    console.log('GET EVENTS: ' + tmp);
  }
}
