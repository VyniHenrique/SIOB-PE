package com.siob_pe.siob_pe.controller.dto;

import com.siob_pe.siob_pe.model.TipoUsuario;

import java.util.UUID;

public record ClientDTO(
        UUID id,
        String clientId,
        String clientSecret,
        String redirectURI,
        TipoUsuario scope
){}
