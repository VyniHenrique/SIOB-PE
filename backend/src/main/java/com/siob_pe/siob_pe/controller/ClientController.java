package com.siob_pe.siob_pe.controller;

import com.siob_pe.siob_pe.controller.dto.ClientDTO;
import com.siob_pe.siob_pe.model.Client;
import com.siob_pe.siob_pe.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/client")
public class ClientController implements GenericController {

    private final ClientService clientService;

    ClientController(ClientService clientService){
        this.clientService = clientService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Void> salvar(@RequestBody ClientDTO clientDTO){
        Client client = new Client();
        client.setId(clientDTO.id());
        client.setClientId(clientDTO.clientId());
        client.setClientSecret(clientDTO.clientSecret());
        client.setRedirectURI(clientDTO.redirectURI());
        client.setScope(clientDTO.scope());

        clientService.salvar(client);

        URI location = gerarHeaderLocation(client.getId());
        return ResponseEntity.created(location).build();
    }
}
