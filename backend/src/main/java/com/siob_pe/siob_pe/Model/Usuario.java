package com.siob_pe.siob_pe.Model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "Usuario")
public class Usuario {

    @Id
    private String id;

    private String matricula;

    private String nome;

    private String email;

    private String senha;

    private TipoUsuario tipoUsuario;

    private boolean usuarioAtivo;

    @CreatedDate
    @Field("data_cadastro")
    private LocalDateTime dataCadastro;

    @LastModifiedDate
    @Field("data_atualizacao")
    private LocalDate dataAtualizacao;

}
