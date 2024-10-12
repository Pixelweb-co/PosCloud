package com.pedidos.cloud.controllers;

import com.pedidos.cloud.models.Eps;
import com.pedidos.cloud.services.EpsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/epss")
public class EpsController {

    @Autowired
    private EpsService epsService;

    @PostMapping
    public ResponseEntity<Eps> crearEps(@RequestBody Eps eps) {
        try {
            Eps epsGuardado = epsService.guardarEps(eps);
            return ResponseEntity.ok(epsGuardado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Eps> actualizarEps(@PathVariable Long id, @RequestBody Eps eps) {
        try {
            Eps epsActualizado = epsService.actualizarEps(id, eps);
            return epsActualizado != null ? ResponseEntity.ok(epsActualizado) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace(); // Imprimir el stack trace del error para depuración
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<Eps> listarEpss() {
        return epsService.listarEpss();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Eps> obtenerEpsPorId(@PathVariable Long id) {
        Eps eps = epsService.obtenerEpsPorId(id);
        return eps != null ? ResponseEntity.ok(eps) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEps(@PathVariable Long id) {
        epsService.eliminarEps(id);
        return ResponseEntity.noContent().build();
    }
}
