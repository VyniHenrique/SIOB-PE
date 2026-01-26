package com.siob_pe.siob_pe.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ocorrencia", schema = "public")
@Data
public class Ocorrencia {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String diretoria;
    private String viaturaEmpregada;
    private String numeroAviso;
    private String numeroViatura;
    private String codigoLocalOcorrencia;
    private String grupamento;
    private LocalDateTime dataHoraAcionamento;
    private String pontoBase;
    private String formaAcionamento;
    private String localAcionamento;
    private String regiao;
    private String ais;
    private String municipio;
    private String bairro;
    private String logradouro;
    private String subgrupoOcorrencia;

    @Enumerated(EnumType.STRING)
    private TipoLogradouro tipoLogradouro;

    @Enumerated(EnumType.STRING)
    private TipoNaturezaOcorrencia tipoNaturezaOcorrencia;

    @Enumerated(EnumType.STRING)
    private SituacaoOcorrencia situacaoOcorrencia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @CreatedDate
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    @LastModifiedDate
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;
}
