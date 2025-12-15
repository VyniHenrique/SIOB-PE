package com.siob_pe.siob_pe.Controller;

import com.siob_pe.siob_pe.Controller.DTO.OcorrenciaDTO;
import com.siob_pe.siob_pe.Controller.mappers.OcorrenciaMapper;
import com.siob_pe.siob_pe.Model.Ocorrencia;
import com.siob_pe.siob_pe.Model.SituacaoOcorrencia;
import com.siob_pe.siob_pe.Service.OcorrenciaService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/ocorrencia")
public class OcorrenciaController implements GenericController {

    private final OcorrenciaService ocorrenciaService;

    private OcorrenciaMapper mapper;

    public OcorrenciaController(OcorrenciaService ocorrenciaService, OcorrenciaMapper mapper) {
        this.ocorrenciaService = ocorrenciaService;
        this.mapper = mapper;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Void> salvar(@RequestBody OcorrenciaDTO ocorrenciaDTO) {
        Ocorrencia ocorrencia = mapper.paraEntidade(ocorrenciaDTO);
        ocorrencia.setSituacaoOcorrencia(SituacaoOcorrencia.EM_ANDAMENTO);
        ocorrenciaService.salvar(ocorrencia);

        URI location = gerarHeaderLocation(ocorrencia.getId());

        return ResponseEntity.created(location).build();

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("{id}")
    public ResponseEntity<Void> atualizar (@PathVariable("id") String id, @RequestBody OcorrenciaDTO ocorrenciaDTO){


        Optional<Ocorrencia> ocorrenciaOptional = ocorrenciaService.buscarPorId(id);

        if (ocorrenciaOptional.isPresent()){
            Ocorrencia ocorrencia = ocorrenciaOptional.get();
            mapper.atualizarOcorrenciaPorDTO(ocorrenciaDTO, ocorrencia);
            ocorrencia.setSituacaoOcorrencia(SituacaoOcorrencia.EM_ANDAMENTO);
            ocorrenciaService.atualizar(ocorrencia);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("{id}")
    public  ResponseEntity<Void> deletar (@PathVariable("id") String id){
        ocorrenciaService.deletar(id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<Ocorrencia>> buscarTodas (){
        List<Ocorrencia> ocorrenciaList = ocorrenciaService.buscarTodos();
        return ResponseEntity.ok(ocorrenciaList);
    }
}
