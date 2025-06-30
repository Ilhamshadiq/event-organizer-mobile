import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
  standalone: false,
})
export class HomeUserPage implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  
  constructor(
    private eventService: EventService,
  private alertCtrl: AlertController,
  private authService: AuthService,
  private router: Router
) {}

showSearch = false;

ngOnInit() {
  this.loadEvents();
}

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.filteredEvents = data;
      },
      error: (err) => {
        console.error('Gagal ambil data event:', err);
      }
    });
  }

  filterEvent(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredEvents = this.events.filter(e =>
      e.nama.toLowerCase().includes(searchTerm)
    );
    console.log('Search:', searchTerm);
  }
    async daftarEvent(id: number) {
    this.eventService.registerToEvent(id).subscribe({
      next: async (res) => {
        const alert = await this.alertCtrl.create({
          header: 'Sukses',
          message: 'Kamu berhasil mendaftar ke event ini!',
          buttons: ['OK'],
        });
        await alert.present();
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Gagal',
          message: err.error?.message || 'Terjadi kesalahan saat mendaftar.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
  getImageUrl(filename: string): string {
    return `http://127.0.0.1:8000/storage/uploads/events/${filename}`;
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
