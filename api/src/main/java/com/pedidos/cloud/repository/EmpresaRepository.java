package com.pedidos.cloud.repository;

import com.pedidos.cloud.models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
}
