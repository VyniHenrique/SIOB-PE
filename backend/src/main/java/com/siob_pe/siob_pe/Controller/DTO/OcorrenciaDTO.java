package com.siob_pe.siob_pe.Controller.DTO;

import com.siob_pe.siob_pe.Model.SituacaoOcorrencia;
import com.siob_pe.siob_pe.Model.TipoLogradouro;
import com.siob_pe.siob_pe.Model.TipoNaturezaOcorrencia;

import java.time.LocalDateTime;

public record OcorrenciaDTO(

        String id,
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
