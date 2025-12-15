package com.siob_pe.siob_pe.Controller.DTO;

import com.siob_pe.siob_pe.Model.TipoUsuario;


public record UsuarioDTO(

        String id,

        String matricula,

        String nome,

        String email,

        String senha,

        TipoUsuario tipoUsuario
) {
}
