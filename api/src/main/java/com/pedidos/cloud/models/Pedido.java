package com.pedidos.cloud.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column
    @Getter
    @Setter
    private LocalDate fecha;

    @Column
    @Getter
    @Setter
    private String consecutivo;

    @Column
    @Getter
    @Setter
    private String vendedor;

    @Column
    @Getter
    @Setter
    private String cliente;

    @Column
    @Getter
    @Setter
    private String estado;

    @Column
    @Getter
    @Setter
    private String tipo;

    @Column
    @Getter
    @Setter
    private Number total;


    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @Getter
    @Setter
    @JsonManagedReference // Administra la serialización de 'detalles' para evitar recursividad
    private Set<DetallePedido> detalles = new HashSet<>();

    public Pedido() {}

    public Pedido(Long id, LocalDate fecha, String consecutivo, String vendedor, String cliente, String estado, String tipo, Set<DetallePedido> detalles) {
        this.id = id;
        this.fecha = fecha;
        this.consecutivo = consecutivo;
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.estado = estado;
        this.tipo = tipo;
        this.detalles = detalles;
    }
}
