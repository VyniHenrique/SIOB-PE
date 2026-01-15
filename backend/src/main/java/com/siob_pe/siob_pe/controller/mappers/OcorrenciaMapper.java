package com.siob_pe.siob_pe.controller.mappers;

import com.siob_pe.siob_pe.controller.DTO.OcorrenciaDTO;
import com.siob_pe.siob_pe.model.Ocorrencia;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OcorrenciaMapper {

    Ocorrencia paraEntidade(OcorrenciaDTO ocorrenciaDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void atualizarOcorrenciaPorDTO(OcorrenciaDTO ocorrenciaDTO, @MappingTarget Ocorrencia ocorrencia);
}
