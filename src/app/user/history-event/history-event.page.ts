import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.page.html',
  styleUrls: ['./history-event.page.scss'],
  standalone: false,
})
export class HistoryEventPage implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService, private authService: AuthService,  private router: Router) {}

  ngOnInit(): void {
    this.eventService.getMyAttendedEvents().subscribe({
      next: (res) => {
        this.events = res.data;
      },
      error: (err) => {
        console.error('❌ Gagal load event hadir:', err);
      }
    });
  }
lihatSertifikat(registrationId: number): void {
  const url = `http://127.0.0.1:8000/api/generate-sertifikat/${registrationId}`;
  window.open(url, '_blank'); // buka tab baru
}
logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout gagal:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}