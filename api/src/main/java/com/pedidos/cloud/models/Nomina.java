package com.pedidos.cloud.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "nomina")
public class Nomina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    private Double salarioBase;
    private Double horasExtras;
    private Double deducciones;
    private Double totalDevengado;
    private Double totalDeducciones;
    private Double netoAPagar;

    @Column(name = "fecha_liquidacion")
    private LocalDate fechaLiquidacion;

    // Getters and Setters
}
