package com.pedidos.cloud.services;

import com.pedidos.cloud.models.{COMPONENTE};
import com.pedidos.cloud.repository.{COMPONENTE}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class {COMPONENTE}Service {

    @Autowired
    private {COMPONENTE}Repository {componente}Repository;

    public {COMPONENTE} guardar{COMPONENTE}({COMPONENTE} {componente}) {
        return {componente}Repository.save({componente});
    }

    public {COMPONENTE} actualizar{COMPONENTE}(Long id, {COMPONENTE} {componente}) {
        if ({componente}Repository.existsById(id)) {
            {componente}.setId(id);
            return {componente}Repository.save({componente});
        } else {
            return null; // o lanzar una excepción
        }
    }

    public List<{COMPONENTE}> listar{COMPONENTE}s() {
        return {componente}Repository.findAll();
    }

    public {COMPONENTE} obtener{COMPONENTE}PorId(Long id) {
        Optional<{COMPONENTE}> {componente} = {componente}Repository.findById(id);
        return {componente}.orElse(null); // o lanzar una excepción
    }

    public void eliminar{COMPONENTE}(Long id) {
        {componente}Repository.deleteById(id);
    }
}
