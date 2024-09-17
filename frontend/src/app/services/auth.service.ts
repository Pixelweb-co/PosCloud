import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Ajusta según tu backend

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  handleLogin(response: any) {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `token=${response.token}; path=/;`;
      document.cookie = `user=${encodeURIComponent(JSON.stringify(response.user))}; path=/;`;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = 'token=; Max-Age=0; path=/;';
      document.cookie = 'user=; Max-Age=0; path=/;';
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
      return match ? match[2] : null;
    }
    return null;
  }

  getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const match = document.cookie.match(new RegExp('(^| )user=([^;]+)'));
      return match ? JSON.parse(decodeURIComponent(match[2])) : null;
    }
    return null;
  }
}
