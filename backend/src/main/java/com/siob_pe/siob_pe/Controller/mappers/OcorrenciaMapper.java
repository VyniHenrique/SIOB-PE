package com.siob_pe.siob_pe.Controller.mappers;

import com.siob_pe.siob_pe.Controller.DTO.OcorrenciaDTO;
import com.siob_pe.siob_pe.Model.Ocorrencia;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OcorrenciaMapper {

    Ocorrencia paraEntidade(OcorrenciaDTO ocorrenciaDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void atualizarOcorrenciaPorDTO(OcorrenciaDTO ocorrenciaDTO, @MappingTarget Ocorrencia ocorrencia);
}
