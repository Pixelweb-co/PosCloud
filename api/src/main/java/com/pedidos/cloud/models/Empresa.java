package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column
    @Setter
    @Getter
    private String razon_social;

    @Column
    @Setter
    @Getter
    private String nit;

    @Column
    @Setter
    @Getter
    private String domicilio;

    @Column
    @Setter
    @Getter
    private String ciudad;


    @Column(name="email")
    @Setter
    @Getter
    private String email;

    @Column
    @Setter
    @Getter
    private String telefono;

    @Column
    @Setter
    @Getter
    private String codigo_actividad;

    @Column
    @Setter
    @Getter
    private String tipo_regimen;

    @Column
    @Setter
    @Getter
    private String estado;

}

