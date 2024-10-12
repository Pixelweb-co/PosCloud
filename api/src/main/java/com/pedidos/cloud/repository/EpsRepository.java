package com.pedidos.cloud.repository;

import com.pedidos.cloud.models.Eps;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpsRepository extends JpaRepository<Eps, Long> {
}
