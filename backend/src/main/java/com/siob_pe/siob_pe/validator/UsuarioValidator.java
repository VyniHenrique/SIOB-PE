package com.siob_pe.siob_pe.validator;

import com.siob_pe.siob_pe.model.Usuario;
import com.siob_pe.siob_pe.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UsuarioValidator {

    private final UsuarioRepository repository;
    private final PasswordEncoder encoder;

    UsuarioValidator(UsuarioRepository repository, PasswordEncoder encoder){
        this.repository = repository;
        this.encoder = encoder;
    }

    // Para se lembrar de criar o login social
    public boolean validarLogin(String matricula, String senha) {
        Optional<Usuario> optionalUsuario = repository.findByMatricula(matricula);

        return optionalUsuario.isPresent() && encoder.matches(senha, optionalUsuario.get().getSenha());
    }

}
