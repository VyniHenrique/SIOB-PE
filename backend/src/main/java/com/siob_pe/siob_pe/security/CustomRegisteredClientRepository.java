package com.siob_pe.siob_pe.security;

import com.siob_pe.siob_pe.model.Client;
import com.siob_pe.siob_pe.service.ClientService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomRegisteredClientRepository implements RegisteredClientRepository {

    private final ClientService clientService;
    private final TokenSettings tokenSettings;
    private final ClientSettings clientSettings;

    public CustomRegisteredClientRepository(ClientService clientService, TokenSettings tokenSettings, ClientSettings clientSettings){
        this.clientService = clientService;
        this.tokenSettings = tokenSettings;
        this.clientSettings = clientSettings;
    }

    @Override
    public void save(RegisteredClient registeredClient) {

    }

    @Override
    public RegisteredClient findById(String id) {
        return null;
    }

    @Override
    public RegisteredClient findByClientId(String clientId) {
        Optional<Client> clientOptional = clientService.obterPorClientId(clientId);

        if (clientOptional.isEmpty()){
            throw new UsernameNotFoundException("Client não encontado");
        }

        Client client = clientOptional.get();

        return RegisteredClient
                .withId(client.getId().toString())
                .clientId(client.getClientId())
                .clientSecret(client.getClientSecret())
                .redirectUri(client.getRedirectURI())
                .scope(client.getScope().toString())
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .clientSettings(clientSettings)
                .tokenSettings(tokenSettings)
                .build();
    }
}
