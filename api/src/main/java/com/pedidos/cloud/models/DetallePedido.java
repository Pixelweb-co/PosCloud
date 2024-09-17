package com.pedidos.cloud.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Getter
    @Setter
    private Long idProducto;

    @Column
    @Getter
    @Setter
    private Integer cantidad;

    @Column
    @Getter
    @Setter
    private Integer precioVenta;

    @Column
    @Getter
    @Setter
    private String nombre;

    @Column
    @Getter
    @Setter
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "id_pedido")
    @Getter
    @Setter
    @JsonBackReference // Evita la serialización recursiva de 'pedido' dentro de 'DetallePedido'
    private Pedido pedido;

    public DetallePedido(Long idProducto, Integer cantidad, Integer precioVenta, String nombre,String observaciones, Pedido pedido) {
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioVenta = precioVenta;
        this.nombre = nombre;
        this.observaciones = observaciones;
        this.pedido = pedido;
    }

    public DetallePedido() {
    }
}
