package com.pedidos.cloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pedidos.cloud.models.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsernameAndPassword(String username, String password);
}
