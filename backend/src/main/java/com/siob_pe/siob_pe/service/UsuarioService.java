package com.siob_pe.siob_pe.service;

import com.siob_pe.siob_pe.model.Usuario;
import com.siob_pe.siob_pe.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder encoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder encoder) {
        this.usuarioRepository = usuarioRepository;
        this.encoder = encoder;
    }

    public void salvar(Usuario usuario) {
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        usuarioRepository.save(usuario);
    }

    public List<Usuario> buscarPorNome(String nome) {
        return usuarioRepository.findByNome(nome);
    }

    public Optional<Usuario> buscarPorMatricula(String matricula) {
        return usuarioRepository.findByMatricula(matricula);
    }

    public void atualizar(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public void deletar(Usuario usuario) {
        usuarioRepository.delete(usuario);
    }

    public boolean validarLogin(String matricula, String senha) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByMatricula(matricula);

        return optionalUsuario.isPresent() && encoder.matches(senha, optionalUsuario.get().getSenha());
    }


}
