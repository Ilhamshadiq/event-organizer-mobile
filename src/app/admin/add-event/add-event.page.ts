import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/service/event/event.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
  standalone: false,
})
export class AddEventPage implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}
  selectedImageFile!: File;
  selectedFotoFile!: File;
  onImageChange(event: any) {
    this.selectedImageFile = event.target.files[0];
  }

  onFotoChange(event: any) {
    this.selectedFotoFile = event.target.files[0];
  }
  ngOnInit() {
    this.eventForm = this.fb.group({
      nama: ['', Validators.required],
      deskripsi: [''],
      lokasi: [''],
      jenis: ['gratis', Validators.required],
      waktu_mulai: ['', Validators.required],
      waktu_selesai: ['', Validators.required],
      kuota: [0, [Validators.required, Validators.min(1)]],
      mengeluarkan_sertifikat: [false],
      form_pendaftaran: [''], // default jika dibutuhkan
      is_active: [true],
      foto: ['default.jpg'] // default jika dibutuhkan
    });
  }

async submitEvent() {
  if (this.eventForm.invalid) return;

  const formValue = this.eventForm.value;

  const formData = new FormData();
  formData.append('nama', formValue.nama);
  formData.append('deskripsi', formValue.deskripsi);
  formData.append('lokasi', formValue.lokasi);
  formData.append('jenis', formValue.jenis);
  formData.append('waktu_mulai', this.convertDate(formValue.waktu_mulai));
  formData.append('waktu_selesai', this.convertDate(formValue.waktu_selesai));
  formData.append('kuota', formValue.kuota);
  formData.append('mengeluarkan_sertifikat', formValue.mengeluarkan_sertifikat ? '1' : '0');
  formData.append('form_pendaftaran', formValue.form_pendaftaran);
  formData.append('is_active', formValue.is_active ? '1' : '0');

  // Pastikan ini adalah File (bukan string)
  // formData.append('image', this.selectedImageFile);
  formData.append('foto', this.selectedFotoFile);

  this.eventService.createEvent(formData).subscribe({
    next: async () => {
      const alert = await this.alertCtrl.create({
        header: 'Sukses',
        message: 'Event berhasil ditambahkan!',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/admin/home');
    },
    error: async (err) => {
      const alert = await this.alertCtrl.create({
        header: 'Gagal',
        message: err.error?.message || 'Terjadi kesalahan.',
        buttons: ['OK']
      });
      await alert.present();
    }
  });
}


  convertDate(isoString: string): string {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())} ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:00`;
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
