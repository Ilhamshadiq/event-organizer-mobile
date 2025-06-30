import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: false,
})
export class HomeAdminPage implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.filteredEvents = [...data];
      },
      error: (err) => {
        console.error('❌ Gagal mengambil data event:', err);
      }
    });
  }
  showSearch = false;


  filterEvent(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredEvents = this.events.filter(ev =>
      ev.nama.toLowerCase().includes(searchTerm)
    );
  }
  getImageUrl(filename: string): string {
  return 'http://127.0.0.1:8000/storage/' + filename;
}

confirmDelete(eventId: number) {
  if (confirm('Yakin ingin menghapus event ini?')) {
    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        console.log('Event berhasil dihapus');
        this.loadEvents(); // refresh list
      },
      error: (err) => {
        console.error('Gagal hapus event:', err);
      }
    });
  }
}

}
