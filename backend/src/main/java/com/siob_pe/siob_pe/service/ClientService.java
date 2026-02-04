package com.siob_pe.siob_pe.service;

import com.siob_pe.siob_pe.model.Client;
import com.siob_pe.siob_pe.repository.ClientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository repository;
    private final PasswordEncoder encoder;

    ClientService(ClientRepository repository, PasswordEncoder encoder){
        this.repository = repository;
        this.encoder = encoder;
    }


    // criar validação de cadastro de client
    public void salvar(Client client){
        String senhaCriptografada = encoder.encode(client.getClientSecret());
        client.setClientSecret(senhaCriptografada);
        repository.save(client);
    }

    public Optional<Client> obterPorClientId(String clientId){
        return repository.findByClientId(clientId);
    }
}
