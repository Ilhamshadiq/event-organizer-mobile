import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart-js',
  templateUrl: './cart-js.page.html',
  styleUrls: ['./cart-js.page.scss'],
  standalone: false,
})
export class CartJsPage implements OnInit {
  statisticData: any;
  selectedEventId: number = 0;
  eventList: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadEventListFromDatabase();
  }
goBack() {
  this.navCtrl.back(); // kembali ke halaman sebelumnya dalam stack
}
  // ✅ Ambil list event dari database
  loadEventListFromDatabase() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>('http://127.0.0.1:8000/api/events', { headers }).subscribe({
      next: (events) => {
        this.eventList = events;
        if (events.length > 0) {
          this.selectedEventId = events[0].id; // 👈 ID dari DB
          this.fetchStatistik(this.selectedEventId);
        }
      },
      error: (err) => {
        console.error('Gagal ambil daftar event:', err);
      }
    });
  }

  // ✅ Ambil statistik berdasarkan ID dari DB
  fetchStatistik(eventId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`http://127.0.0.1:8000/api/participants/${eventId}/statistic`, { headers })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.statisticData = response;
            this.renderChart();
          } else {
            console.warn('Data statistik tidak ditemukan:', response);
          }
        },
        error: (err) => {
          console.error('Gagal mengambil data statistik:', err);
        }
      });
  }

  // ✅ Render Chart
  renderChart() {
    if (!this.statisticData) return;

    setTimeout(() => {
      const ctx = document.getElementById('eventChart') as HTMLCanvasElement;
      if (!ctx) {
        console.error('Canvas element tidak ditemukan.');
        return;
      }

      const data = this.statisticData;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Peserta'],
          datasets: [
            {
              label: 'Hadir',
              data: [data.hadir],
              backgroundColor: '#34A853'
            },
            {
              label: 'Tidak Hadir',
              data: [data.tidak_hadir],
              backgroundColor: '#EA4335'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, 0);
  }
}
