package com.pedidos.cloud.services;

import com.pedidos.cloud.models.Empresa;
import com.pedidos.cloud.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public Empresa guardarEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Empresa actualizarEmpresa(Long id, Empresa empresa) {
        if (empresaRepository.existsById(id)) {
            empresa.setId(id);
            return empresaRepository.save(empresa);
        } else {
            return null; // o lanzar una excepción
        }
    }

    public List<Empresa> listarEmpresas() {
        return empresaRepository.findAll();
    }

    public Empresa obtenerEmpresaPorId(Long id) {
        Optional<Empresa> empresa = empresaRepository.findById(id);
        return empresa.orElse(null); // o lanzar una excepción
    }

    public void eliminarEmpresa(Long id) {
        empresaRepository.deleteById(id);
    }
}
