package com.siob_pe.siob_pe.service;

import com.siob_pe.siob_pe.model.Ocorrencia;
import com.siob_pe.siob_pe.model.SituacaoOcorrencia;
import com.siob_pe.siob_pe.model.TipoNaturezaOcorrencia;
import com.siob_pe.siob_pe.repository.OcorrenciaRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OcorrenciaService {

    private final OcorrenciaRepository ocorrenciaRepository;

    public OcorrenciaService(OcorrenciaRepository ocorrenciaRepository) {
        this.ocorrenciaRepository = ocorrenciaRepository;
    }

    public void salvar(Ocorrencia ocorrencia){
        ocorrenciaRepository.save(ocorrencia);
    }

    public void atualizar(Ocorrencia ocorrencia){
        ocorrenciaRepository.save(ocorrencia);
    }

    public Optional<Ocorrencia> buscarPorId(String id){
        return ocorrenciaRepository.findById(id);
    }

    public void deletar(String id){
        Optional<Ocorrencia> optionalOcorrencia = buscarPorId(id);
        if (optionalOcorrencia.isPresent()){
            Ocorrencia ocorrencia = optionalOcorrencia.get();
            ocorrencia.setSituacaoOcorrencia(SituacaoOcorrencia.DELETADA);
            salvar(ocorrencia);
        }
    }


    public List<Ocorrencia> buscarTodos(){
        return ocorrenciaRepository.findAll();
    }
}
