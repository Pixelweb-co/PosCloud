package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column
    @Setter
    @Getter
    private String sku;

    @Column
    @Setter
    @Getter
    private String nombre;

    @Column
    @Setter
    @Getter
    private String categoria;


    @Column
    @Setter
    @Getter
    private String estado;

    @Column
    @Setter
    @Getter
    private String descripcion;

    @Column(nullable = false)
    @Setter
    @Getter
    private Integer valor;
}
