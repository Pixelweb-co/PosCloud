package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column
    @Setter
    @Getter
    private String nombre;

    @Column(name="tel")
    @Setter
    @Getter
    private String telefono;

}
