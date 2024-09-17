package com.pedidos.cloud.services;

import com.pedidos.cloud.models.Usuario;
import com.pedidos.cloud.repository.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    private static final String SECRET_KEY = "wGqGZ2O7tFfO1x4P7Vo/3c8o3/2LhNMFk2g6K1WzY/6="; // Cambia esto a una clave segura

    // Simula una base de datos de usuarios
    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<Usuario> authenticate(String username, String password) {
        // Aquí deberías validar las credenciales con tu base de datos
        return usuarioRepository.findByUsernameAndPassword(username, password);
    }

    public String generateToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getUsername())
                .claim("role", usuario.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 864_000_000)) // 10 días
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    private boolean isAuthenticatedOnServer() {
        // Aquí puedes acceder a las cookies del servidor si es necesario
        // Dependiendo de cómo estés manejando el SSR, podrías implementar la lógica de autenticación aquí

        // Ejemplo básico:
        // Devuelve false si no se puede autenticar en el servidor
        return true;
    }
}
