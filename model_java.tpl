package com.pedidos.cloud.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "{componente}s")
public class {COMPONENTE} {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;


    {CAMPOS_JAVA}



}
