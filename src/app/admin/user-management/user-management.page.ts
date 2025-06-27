import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';
import { of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
  standalone: false
})
export class UserManagementPage implements OnInit {

  peserta: any[] = [];
  selectedEvent: any = 'all';
  eventList: any[] = [];
  searchTerm: string = '';


  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEventList(); // memuat dropdown
  }

  loadEventList() {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.eventList = events;
        this.loadPesertaByEvent(this.selectedEvent);
      },
      error: (err) => {
        console.error('Gagal ambil daftar event:', err);
      }
    });
  }

loadPesertaByEvent(eventId: any) {
  if (eventId === 'all') {
    const requests = this.eventList.map(event =>
      this.eventService.getPesertaHTMLByEventId(event.id).pipe(
        map(pesertaList =>
          pesertaList.map(p => ({ ...p, event }))
        ),
        catchError(err => {
          console.error(`Gagal ambil peserta untuk event ${event.id}:`, err);
          return of([]); // tetap lanjut
        })
      )
    );

    forkJoin(requests).subscribe({
      next: (allResults: any[][]) => {
        this.peserta = ([] as any[]).concat(...allResults);
        console.log('Semua peserta dengan event:', this.peserta);
      },
      error: (err) => {
        console.error('Gagal total ambil peserta:', err);
      }
    });
  } else {
    const selectedEvent = this.eventList.find(e => e.id === eventId);

    this.eventService.getPesertaHTMLByEventId(eventId).pipe(
      map(pesertaList =>
        pesertaList.map(p => ({ ...p, event: selectedEvent }))
      )
    ).subscribe({
      next: (data: any[]) => {
        this.peserta = data;
        console.log(`Peserta untuk event ${eventId}:`, this.peserta);
        
      },
      error: (err) => {
        console.error('Gagal ambil data peserta event:', err);
      }
    });
  }
}


  onEventChange(event: any) {
    this.loadPesertaByEvent(event.detail.value);
  }

  konfirmasiPembayaran(participantId: number, status: string) {
    if (status === 'diterima') {
      this.eventService.konfirmasiPembayaran(participantId).subscribe({
        next: () => {
          console.log('Status pembayaran berhasil dikonfirmasi');
        },
        error: (err) => {
          console.error('Gagal konfirmasi pembayaran:', err);
        }
      });
    }
  }
  getFilteredPeserta() {
  if (!this.searchTerm.trim()) {
    return this.peserta;
  }

  const term = this.searchTerm.toLowerCase();
  return this.peserta.filter(p =>
    p.user?.name?.toLowerCase().includes(term) ||
    p.user?.email?.toLowerCase().includes(term)
  );
}

}
