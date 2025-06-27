import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  registerForm: FormGroup;
  profilePhotoFile: File | null = null;
  fotoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onFileChange(event: any, type: 'profile' | 'foto') {
    const file = event.target.files[0];
    if (type === 'profile') this.profilePhotoFile = file;
    else this.fotoFile = file;
  }

async onSubmit() {
  console.log('Submit clicked!');
  if (this.registerForm.invalid) {
    console.log('Form is invalid');
    return;
  }

  const formData = {
    ...this.registerForm.value,
    profile_photo: this.profilePhotoFile,
    foto: this.fotoFile,
  };

  console.log('Form Data:', formData);

  this.authService.getCsrfToken().subscribe(() => {
    this.authService.register(formData).subscribe({
      next: async (res) => {
        const alert = await this.alertCtrl.create({
          header: 'Success',
          message: res.message,
          buttons: ['OK'],
        });
        await alert.present();
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.error?.message || 'Failed to register',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  });
}  
}
