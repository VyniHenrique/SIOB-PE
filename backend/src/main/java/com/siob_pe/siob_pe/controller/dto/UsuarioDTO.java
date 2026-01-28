package com.siob_pe.siob_pe.controller.dto;

import com.siob_pe.siob_pe.model.TipoUsuario;

import java.util.UUID;


public record UsuarioDTO(

        UUID id,

        String matricula,

        String nome,

        String email,

        String senha,

        TipoUsuario tipoUsuario
) {
}
