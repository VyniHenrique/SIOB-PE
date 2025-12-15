package com.siob_pe.siob_pe.Controller;


import com.siob_pe.siob_pe.Controller.DTO.UsuarioDTO;
import com.siob_pe.siob_pe.Model.Usuario;
import com.siob_pe.siob_pe.Service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController implements GenericController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Void> salvar(@RequestBody UsuarioDTO usuarioDTO) {

        Usuario usuario = new Usuario();
        usuario.setId(usuarioDTO.id());
        usuario.setTipoUsuario(usuarioDTO.tipoUsuario());
        usuario.setMatricula(usuarioDTO.matricula());
        usuario.setNome(usuarioDTO.nome());
        usuario.setEmail(usuarioDTO.email());
        usuario.setSenha(usuarioDTO.senha());
        usuario.setUsuarioAtivo(true);

        usuarioService.salvar(usuario);

        URI location = gerarHeaderLocation(usuario.getId());
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("{nome}")
    public ResponseEntity<List<UsuarioDTO>>  buscarPorNome(@PathVariable("nome") String nome) {


        List<Usuario> resultado = usuarioService.buscarPorNome(nome);

        List<UsuarioDTO> resposta = resultado.stream().map( usuario -> new UsuarioDTO(
                        usuario.getId(),
                        usuario.getMatricula(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.getSenha(),
                        usuario.getTipoUsuario())).toList();

        return ResponseEntity.ok(resposta);
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<UsuarioDTO> loginUsuario(
            @RequestParam("matricula") String matricula,
            @RequestParam("senha") String senha) {

    Optional<Usuario> optionalUsuario = usuarioService.buscarPorMatricula(matricula);

    if (optionalUsuario.isPresent()) {
        boolean userExist = usuarioService.validarLogin(optionalUsuario.get().getSenha(), optionalUsuario.get().getMatricula());
        if (userExist) {
            return ResponseEntity.ok().build();
        }
    }
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("{matricula}")
    public ResponseEntity<Void> atualizar(@PathVariable("matricula") String matricula, @RequestBody UsuarioDTO usuarioDTO) {
        Optional<Usuario> usuarioOptional = usuarioService.buscarPorMatricula(matricula);

        if (usuarioOptional.isPresent()){
            Usuario usuario = new Usuario();

            usuario.setId(usuarioOptional.get().getId());
            usuario.setNome(usuarioDTO.nome());
            usuario.setEmail(usuarioDTO.email());
            usuario.setSenha(usuarioDTO.senha());
            usuario.setTipoUsuario(usuarioDTO.tipoUsuario());
            usuario.setMatricula(matricula);


            usuarioService.atualizar(usuario);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("{matricula}")
    public ResponseEntity<Void> deletar(@PathVariable("matricula") String matricula) {

        Optional<Usuario> usuarioOptional = usuarioService.buscarPorMatricula(matricula);

        if(usuarioOptional.isPresent()){

            Usuario usuario = usuarioOptional.get();

            usuarioService.deletar(usuario);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
