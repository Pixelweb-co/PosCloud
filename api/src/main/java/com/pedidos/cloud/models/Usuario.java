package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column
    @Setter
    @Getter
    private String username;

    @Column
    @Setter
    @Getter
    private String password;

    @Column
    @Setter
    @Getter
    private String status;

    @Column
    @Setter
    @Getter
    private String role;
}
