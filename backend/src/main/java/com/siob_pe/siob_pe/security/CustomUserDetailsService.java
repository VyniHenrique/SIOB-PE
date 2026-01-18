package com.siob_pe.siob_pe.security;

import com.siob_pe.siob_pe.model.Usuario;
import com.siob_pe.siob_pe.service.UsuarioService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioService service;

    public CustomUserDetailsService(UsuarioService service){
        this.service = service;
    }

    @Override
    public UserDetails loadUserByUsername(String matricula) throws UsernameNotFoundException {

        Optional<Usuario> usuarioOptional = service.buscarPorMatricula(matricula);
        if (usuarioOptional.isEmpty()){
            throw new UsernameNotFoundException("Usuário não encontrado");
        }
        Usuario usuario = usuarioOptional.get();

        return User.builder()
                .username(usuario.getMatricula())
                .password(usuario.getSenha())
                .roles(usuario.getTipoUsuario().toString())
                .build();
    }
}
