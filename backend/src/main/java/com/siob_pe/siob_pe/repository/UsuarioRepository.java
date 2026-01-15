package com.siob_pe.siob_pe.repository;

import com.siob_pe.siob_pe.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    List<Usuario> findByNome(String nome);

    Optional<Usuario> findByMatricula(String matricula);

}
