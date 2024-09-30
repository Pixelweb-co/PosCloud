package com.pedidos.cloud.controllers;

import com.pedidos.cloud.models.Empresa;
import com.pedidos.cloud.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping
    public ResponseEntity<Empresa> crearEmpresa(@RequestBody Empresa empresa) {
        try {
            Empresa empresaGuardado = empresaService.guardarEmpresa(empresa);
            return ResponseEntity.ok(empresaGuardado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> actualizarEmpresa(@PathVariable Long id, @RequestBody Empresa empresa) {
        try {
            Empresa empresaActualizado = empresaService.actualizarEmpresa(id, empresa);
            return empresaActualizado != null ? ResponseEntity.ok(empresaActualizado) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace(); // Imprimir el stack trace del error para depuración
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<Empresa> listarEmpresas() {
        return empresaService.listarEmpresas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> obtenerEmpresaPorId(@PathVariable Long id) {
        Empresa empresa = empresaService.obtenerEmpresaPorId(id);
        return empresa != null ? ResponseEntity.ok(empresa) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpresa(@PathVariable Long id) {
        empresaService.eliminarEmpresa(id);
        return ResponseEntity.noContent().build();
    }
}
