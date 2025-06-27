import { Component, OnInit } from '@angular/core';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint
} from '@capacitor/barcode-scanner';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer-navbar',
  templateUrl: './footer-navbar.component.html',
  styleUrls: ['./footer-navbar.component.scss'],
  imports: [IonicModule, RouterModule],
  standalone: true,
})
export class FooterNavbarComponent  implements OnInit {
  ngOnInit(): void {
    
  }
  scannedResult: string | null = null;

  constructor(private authService: AuthService,private router: Router) {}

  // Opsional: cek izin kamera jika plugin Camera diinstal
  private async ensureCameraPermission(): Promise<boolean> {
    // Jika tidak mengimpor Camera, kembalikan true agar OS prompt otomatis muncul
    try {
      // Uncomment jika Camera plugin terpasang:
      // const status = await Camera.checkPermissions();
      // if (status.camera !== 'granted') {
      //   const res = await Camera.requestPermissions({ permissions: ['camera'] });
      //   return res.camera === 'granted';
      // }
      return true;
    } catch (e) {
      console.warn('Error checking camera permission', e);
      return true;
    }
  }

  async startScan() {
    // Jika ingin cek izin manual, tetap panggil ensureCameraPermission
    const ok = await this.ensureCameraPermission();
    if (!ok) {
      alert('Izin kamera diperlukan untuk scan');
      return;
    }

    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });
      // Hasil ada di property ScanResult
      if (result && result.ScanResult) {
        this.scannedResult = result.ScanResult;
      } else {
        this.scannedResult = null;
      }
    } catch (e) {
      console.error('Error saat scanBarcode:', e);
      this.scannedResult = null;
    }
  }

  // Hapus atau jangan panggil stopScan() karena tidak ada di API resmi
  // Jika ingin memberi instruksi batal, tangani lewat UI/back button
  cancelScanInstruction() {
    // Misalnya tampilkan toast atau teks “Tekan Back untuk batal”
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
