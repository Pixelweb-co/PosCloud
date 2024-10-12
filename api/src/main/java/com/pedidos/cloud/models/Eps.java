package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "epss")
public class Eps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;


    @Column
    @Getter
    @Setter
    private String nombre;
    @Column
    @Getter
    @Setter
    private Integer nit;




}
