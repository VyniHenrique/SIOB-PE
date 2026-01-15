package com.siob_pe.siob_pe.controller.DTO;

import com.siob_pe.siob_pe.model.TipoUsuario;


public record UsuarioDTO(

        String id,

        String matricula,

        String nome,

        String email,

        String senha,

        TipoUsuario tipoUsuario
) {
}
