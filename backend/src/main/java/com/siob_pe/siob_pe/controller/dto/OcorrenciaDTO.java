package com.siob_pe.siob_pe.controller.dto;

import com.siob_pe.siob_pe.model.SituacaoOcorrencia;
import com.siob_pe.siob_pe.model.TipoLogradouro;
import com.siob_pe.siob_pe.model.TipoNaturezaOcorrencia;

import java.time.LocalDateTime;
import java.util.UUID;

public record OcorrenciaDTO(

        UUID id,
        String diretoria,
        String viaturaEmpregada,
        String numeroAviso,
        String numeroViatura,
        String codigoLocalOcorrencia,
        String grupamento,
        LocalDateTime dataHoraAcionamento,
        String pontoBase,
        String formaAcionamento,
        String localAcionamento,
        String regiao,
        String ais,
        String municipio,
        String bairro,
        TipoLogradouro tipoLogradouro,
        String logradouro,
        TipoNaturezaOcorrencia tipoNaturezaOcorrencia,
        String subgrupoOcorrencia,
        SituacaoOcorrencia situacaoOcorrencia
) {
}
