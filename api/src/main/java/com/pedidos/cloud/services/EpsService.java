package com.pedidos.cloud.services;

import com.pedidos.cloud.models.Eps;
import com.pedidos.cloud.repository.EpsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EpsService {

    @Autowired
    private EpsRepository epsRepository;

    public Eps guardarEps(Eps eps) {
        return epsRepository.save(eps);
    }

    public Eps actualizarEps(Long id, Eps eps) {
        if (epsRepository.existsById(id)) {
            eps.setId(id);
            return epsRepository.save(eps);
        } else {
            return null; // o lanzar una excepción
        }
    }

    public List<Eps> listarEpss() {
        return epsRepository.findAll();
    }

    public Eps obtenerEpsPorId(Long id) {
        Optional<Eps> eps = epsRepository.findById(id);
        return eps.orElse(null); // o lanzar una excepción
    }

    public void eliminarEps(Long id) {
        epsRepository.deleteById(id);
    }
}
