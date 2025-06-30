import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event/event.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
  standalone: false,
})
export class EditEventPage implements OnInit {
  eventForm!: FormGroup;
  eventId!: number;
  // selectedImage: File | null = null;
  selectedFoto: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private navCtrl: NavController
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadEventData();
  }

  initForm() {
    this.eventForm = this.fb.group({
      nama: ['', Validators.required],
      deskripsi: ['', Validators.required],
      lokasi: ['', Validators.required],
      jenis: ['gratis', Validators.required],
      waktu_mulai: ['', Validators.required],
      waktu_selesai: ['', Validators.required],
      kuota: [0, [Validators.required, Validators.min(1)]],
      mengeluarkan_sertifikat: [false],
      is_active: [true]
    });
  }

  loadEventData() {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.eventForm.patchValue({
        nama: event.nama,
        deskripsi: event.deskripsi,
        lokasi: event.lokasi,
        jenis: event.jenis,
        waktu_mulai: event.waktu_mulai,
        waktu_selesai: event.waktu_selesai,
        kuota: event.kuota,
        mengeluarkan_sertifikat: event.mengeluarkan_sertifikat,
        is_active: event.is_active
      });
    });
  }

  // onImageChange(event: any) {
  //   this.selectedImage = event.target.files[0];
  // }

  onFotoChange(event: any) {
    this.selectedFoto = event.target.files[0];
  }

submitEvent() {
  if (this.eventForm.invalid) return;

  const formData = new FormData();
  for (const key in this.eventForm.value) {
    formData.append(key, this.eventForm.value[key]);
  }

  // // Ganti 'banner' menjadi 'image' agar cocok dengan backend
  // if (this.selectedImage) {
  //   formData.append('image', this.selectedImage);
  // }

  if (this.selectedFoto) {
    formData.append('foto', this.selectedFoto);
  }

  // 🔍 Tambahan: cek isi FormData
  console.log('📦 FormData yang dikirim:');
  formData.forEach((value, key) => {
    console.log(`🔑 ${key}:`, value);
  });

  this.eventService.updateEvent(this.eventId, formData).subscribe({
    next: () => {
      alert('✅ Event berhasil diperbarui');
      this.router.navigate(['/admin/home']);
    },
    error: (err) => {
      console.error('❌ Gagal update event:', err);
      alert('⚠️ Gagal memperbarui event');
    }
  });
}

}
