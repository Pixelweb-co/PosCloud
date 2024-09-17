package com.pedidos.cloud.controllers;

import com.pedidos.cloud.models.Usuario;

public class LoginResponse {
    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    private Usuario usuario;
    private String token;

    public LoginResponse(Usuario usuario, String token) {
        this.usuario = usuario;
        this.token = token;
    }

}
