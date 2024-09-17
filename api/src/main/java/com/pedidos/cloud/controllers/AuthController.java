package com.pedidos.cloud.controllers;

import com.pedidos.cloud.controllers.LoginRequest;
import com.pedidos.cloud.controllers.LoginResponse;
import com.pedidos.cloud.models.Usuario;
import com.pedidos.cloud.services.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> user = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (user.isPresent()) {
            String token = authService.generateToken(user.get());
            return new LoginResponse(user.get(), token);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
