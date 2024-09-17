    package com.pedidos.cloud.repository;

    import com.pedidos.cloud.models.Persona;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface Repository extends JpaRepository<Persona,Long> {
    }
