import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  private apiUrl = 'http://localhost:8080/api/auth/validate'; // URL para validar el token en el servidor

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Ejecutar en el navegador
      const token = this.getTokenFromCookie();
      if (token) {
        return this.validateToken(token);
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Ejecutar en el servidor
      return this.isAuthenticatedOnServer();
    }
  }

  private getTokenFromCookie(): string | null {
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  private validateToken(token: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(this.apiUrl, { token })
      .pipe(
        map(response => {
          if (response.valid) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
  }

  private isAuthenticatedOnServer(): boolean {
    // Aquí puedes acceder a las cookies del servidor si es necesario
    // Dependiendo de cómo estés manejando el SSR, podrías implementar la lógica de autenticación aquí

    // Ejemplo básico:
    // Devuelve false si no se puede autenticar en el servidor
    return false;
  }
}
