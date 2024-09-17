package com.pedidos.cloud.services;

import com.pedidos.cloud.models.DetallePedido;
import com.pedidos.cloud.models.Pedido;
import com.pedidos.cloud.repository.DetallePedidoRepository;
import com.pedidos.cloud.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository; // Asegúrate de tener este repositorio
    @Transactional
    public Pedido guardarPedido(Pedido pedido) {
        // Primero guarda el pedido para obtener el ID generado
        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // Persistir los detalles del pedido
        for (DetallePedido detalle : pedido.getDetalles()) {
            detalle.setPedido(pedidoGuardado); // Asigna el pedido guardado con su ID
            detallePedidoRepository.save(detalle); // Ahora guarda cada detalle
        }

        return pedidoGuardado;
    }

    @Transactional
    public Pedido actualizarPedido(Long id, Pedido pedido) {
        Optional<Pedido> pedidoExistente = pedidoRepository.findById(id);

        if (pedidoExistente.isPresent()) {
            Pedido pedidoActual = pedidoExistente.get();

            // Eliminar los detalles antiguos
            if (!pedidoActual.getDetalles().isEmpty()) {
                for (DetallePedido detalle : pedidoActual.getDetalles()) {
                    detallePedidoRepository.delete(detalle); // Eliminar cada detalle antiguo
                }
                pedidoActual.getDetalles().clear(); // Limpiar la lista de detalles en el pedido actual
            }

            // Actualizar el pedido principal
            pedidoActual.setFecha(pedido.getFecha());
            pedidoActual.setConsecutivo(pedido.getConsecutivo());
            pedidoActual.setVendedor(pedido.getVendedor());
            pedidoActual.setCliente(pedido.getCliente());
            pedidoActual.setEstado(pedido.getEstado());
            pedidoActual.setTipo(pedido.getTipo());

            // Agregar los nuevos detalles
            for (DetallePedido detalle : pedido.getDetalles()) {
                detalle.setPedido(pedidoActual); // Asignar el pedido actualizado a cada detalle
                detallePedidoRepository.save(detalle); // Guardar cada detalle
            }

            return pedidoRepository.save(pedidoActual); // Guardar el pedido actualizado
        } else {
            return null; // o lanzar una excepción si es necesario
        }
    }


    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido obtenerPedidoPorId(Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.orElse(null); // o lanzar una excepción
    }

    public void eliminarPedido(Long id) {
        pedidoRepository.deleteById(id);
    }
}
