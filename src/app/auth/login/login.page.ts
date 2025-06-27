import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) return;

    this.authService.getCsrfToken().subscribe(() => {
      this.authService.login(this.loginForm.value).subscribe({
        next: async (res) => {
          const { user, token } = res;

          // Simpan ke localStorage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);

          // Tampilkan alert sukses
          const alert = await this.alertCtrl.create({
            header: 'Berhasil',
            message: 'Login berhasil!',
            buttons: ['OK'],
          });
          await alert.present();

          // Redirect berdasarkan role
          switch (user.role) {
            case 'admin':
              this.navCtrl.navigateRoot('/admin/home');
              break;
            case 'peserta':
            case 'user':
              this.navCtrl.navigateRoot('/user/home');
              break;
            default:
              this.navCtrl.navigateRoot('/login'); // fallback
              break;
          }
        },
        error: async (err) => {
          const alert = await this.alertCtrl.create({
            header: 'Login Gagal',
            message: err.error?.message || 'Email atau password salah',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
    });
  }
}
