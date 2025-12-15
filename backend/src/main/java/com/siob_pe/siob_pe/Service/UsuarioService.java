package com.siob_pe.siob_pe.Service;

import com.siob_pe.siob_pe.Model.Usuario;
import com.siob_pe.siob_pe.Repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public void salvar(Usuario usuario) {
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

    public boolean validarLogin(String senha, String matricula) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByMatricula(matricula);

        return optionalUsuario.map(usuario -> usuario.getSenha().equals(senha)).orElse(false);

    }


}
