package com.siob_pe.siob_pe.repository;

import com.siob_pe.siob_pe.model.Ocorrencia;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OcorrenciaRepository extends MongoRepository<Ocorrencia, String> {


}
