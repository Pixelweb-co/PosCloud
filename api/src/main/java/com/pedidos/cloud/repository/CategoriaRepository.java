package com.pedidos.cloud.repository;

import com.pedidos.cloud.models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
