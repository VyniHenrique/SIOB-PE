package com.siob_pe.siob_pe.Repository;

import com.siob_pe.siob_pe.Model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    List<Usuario> findByNome(String nome);

    Optional<Usuario> findByMatricula(String matricula);

}
