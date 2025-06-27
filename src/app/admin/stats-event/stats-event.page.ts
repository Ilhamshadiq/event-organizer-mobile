import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';

@Component({
  selector: 'app-stats-event',
  templateUrl: './stats-event.page.html',
  styleUrls: ['./stats-event.page.scss'],
  standalone: false,
})
export class StatsEventPage implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('❌ Gagal mengambil data event:', err);
      }
    });
  }
}
