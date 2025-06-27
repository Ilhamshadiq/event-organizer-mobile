import { Component } from '@angular/core';
import { EventService } from 'src/app/service/event/event.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: false,
})
export class ScanPage {
  scannedData: any;

  constructor(
    private eventService: EventService,
    private alertCtrl: AlertController
  ) {}

  onScanSuccess(data: string) {
    // Cek apakah data adalah URL
    if (this.isValidUrl(data)) {
      // Buka di browser eksternal (Chrome atau default browser di HP)
      window.open(data, '_system');
      return;
    }

    // Kalau bukan URL, coba parse JSON dan update attendance
    try {
      const parsed = JSON.parse(data);
      const { event_id, user_id } = parsed;

      this.eventService.updateAttendance(event_id, user_id).subscribe({
        next: async () => {
          const alert = await this.alertCtrl.create({
            header: '✅ Sukses',
            message: 'Status kehadiran diperbarui!',
            buttons: ['OK']
          });
          await alert.present();
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: '❌ Gagal',
            message: 'Tidak dapat update kehadiran.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });

    } catch (e) {
      console.error('QR code tidak valid dan bukan URL');
    }
  }

  // Fungsi helper untuk cek apakah string itu URL valid
  isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }
}
