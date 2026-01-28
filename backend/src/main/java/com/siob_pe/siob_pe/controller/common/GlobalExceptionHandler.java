package com.siob_pe.siob_pe.controller.common;

import com.siob_pe.siob_pe.controller.dto.ErroResposta;
import com.siob_pe.siob_pe.exception.MatriculaNaoEncontrada;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErroResposta handleAcessoNegadoException(AccessDeniedException e){
        return new ErroResposta(HttpStatus.FORBIDDEN.value(), "Acesso negado", List.of());
    }

    @ExceptionHandler(MatriculaNaoEncontrada.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErroResposta handleMatriculaNaoEncontrada(MatriculaNaoEncontrada e){
        return new ErroResposta(HttpStatus.NOT_FOUND.value(), e.getMessage(), List.of());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErroResposta handleExceptionNaoTratada(){
        return new ErroResposta(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Ocorreu um erro inesperado",
                List.of()
        );
    }
}
