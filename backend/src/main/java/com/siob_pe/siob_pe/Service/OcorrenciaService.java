package com.siob_pe.siob_pe.Service;

import com.siob_pe.siob_pe.Model.Ocorrencia;
import com.siob_pe.siob_pe.Model.SituacaoOcorrencia;
import com.siob_pe.siob_pe.Repository.OcorrenciaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
