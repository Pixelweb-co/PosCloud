package com.pedidos.cloud.controllers;

import com.pedidos.cloud.models.{COMPONENTE};
import com.pedidos.cloud.services.{COMPONENTE}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/{componente}s")
public class {COMPONENTE}Controller {

    @Autowired
    private {COMPONENTE}Service {componente}Service;

    @PostMapping
    public ResponseEntity<{COMPONENTE}> crear{COMPONENTE}(@RequestBody {COMPONENTE} {componente}) {
        try {
            {COMPONENTE} {componente}Guardado = {componente}Service.guardar{COMPONENTE}({componente});
            return ResponseEntity.ok({componente}Guardado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<{COMPONENTE}> actualizar{COMPONENTE}(@PathVariable Long id, @RequestBody {COMPONENTE} {componente}) {
        try {
            {COMPONENTE} {componente}Actualizado = {componente}Service.actualizar{COMPONENTE}(id, {componente});
            return {componente}Actualizado != null ? ResponseEntity.ok({componente}Actualizado) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace(); // Imprimir el stack trace del error para depuración
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<{COMPONENTE}> listar{COMPONENTE}s() {
        return {componente}Service.listar{COMPONENTE}s();
    }

    @GetMapping("/{id}")
    public ResponseEntity<{COMPONENTE}> obtener{COMPONENTE}PorId(@PathVariable Long id) {
        {COMPONENTE} {componente} = {componente}Service.obtener{COMPONENTE}PorId(id);
        return {componente} != null ? ResponseEntity.ok({componente}) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar{COMPONENTE}(@PathVariable Long id) {
        {componente}Service.eliminar{COMPONENTE}(id);
        return ResponseEntity.noContent().build();
    }
}
