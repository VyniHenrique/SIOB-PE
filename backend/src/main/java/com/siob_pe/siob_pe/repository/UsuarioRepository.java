package com.siob_pe.siob_pe.repository;

import com.siob_pe.siob_pe.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    List<Usuario> findByNome(String nome);

    Optional<Usuario> findByMatricula(String matricula);

}
