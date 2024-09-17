package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column
    @Setter
    @Getter
    private String nombre;

    @Column
    @Setter
    @Getter
    private Long padre; // ID de la categoría padre (null si no tiene)
}
