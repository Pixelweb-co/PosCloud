package com.pedidos.cloud.controllers;

import com.pedidos.cloud.models.Pedido;
import com.pedidos.cloud.models.DetallePedido;
import com.pedidos.cloud.models.Producto;
import com.pedidos.cloud.services.PedidoService;
import com.pedidos.cloud.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private ProductoService productoService; // Servicio para obtener los productos

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        try {
            // Procesar los detalles del pedido
            Set<DetallePedido> nuevosDetalles = pedido.getDetalles().stream()
                    .map(detalle -> new DetallePedido(
                            detalle.getIdProducto(),
                            detalle.getCantidad(),
                            detalle.getPrecioVenta(),
                            detalle.getNombre(),
                            detalle.getObservaciones(),
                            pedido // Establecer la relación con el pedido
                    ))
                    .collect(Collectors.toSet());

            // Crear y guardar el pedido
            Pedido pedidoGuardado = pedidoService.guardarPedido(new Pedido(
                    null,
                    pedido.getFecha(),
                    pedido.getConsecutivo(),
                    pedido.getVendedor(),
                    pedido.getCliente(),
                    pedido.getEstado(),
                    pedido.getTipo(),
                    nuevosDetalles
            ));

            return ResponseEntity.ok(pedidoGuardado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }


    // Obtener todos los pedidos
    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerPedidos() {
        try {
            List<Pedido> pedidos = pedidoService.listarPedidos();
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Obtener un pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPedidoPorId(@PathVariable Long id) {
        try {
            Optional<Pedido> pedido = Optional.ofNullable(pedidoService.obtenerPedidoPorId(id));
            return pedido.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Actualizar un pedido
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizarPedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        try {
            Pedido pedidoActualizado = pedidoService.actualizarPedido(id, pedido);

            if (pedidoActualizado == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(pedidoActualizado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Eliminar un pedido por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPedido(@PathVariable Long id) {
        try {
            // Verificar si el pedido existe
            Optional<Pedido> pedidoExistente = Optional.ofNullable(pedidoService.obtenerPedidoPorId(id));
            if (!pedidoExistente.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            // Eliminar el pedido
            pedidoService.eliminarPedido(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
