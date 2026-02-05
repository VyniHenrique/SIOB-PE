package com.siob_pe.siob_pe.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Configuration
@EnableWebSecurity
public class AuthorizationServerConfiguration {

    @Bean
    @Order(1)
    public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception{

        OAuth2AuthorizationServerConfigurer auth2AuthorizationServerConfigurer =
                OAuth2AuthorizationServerConfigurer.authorizationServer();


        return http
                .securityMatcher(auth2AuthorizationServerConfigurer.getEndpointsMatcher())

                .oauth2ResourceServer(oauth2resourceServer ->
                        oauth2resourceServer.jwt(Customizer.withDefaults()))

                .with(auth2AuthorizationServerConfigurer, (authorizationServer) ->
                                authorizationServer.oidc(Customizer.withDefaults()))

                .exceptionHandling(exceptions -> exceptions
                        .defaultAuthenticationEntryPointFor(
                                new LoginUrlAuthenticationEntryPoint("http://localhost:3000/login"),
                                new MediaTypeRequestMatcher(MediaType.TEXT_HTML)
                        ))

                .csrf(csrf -> csrf.disable())
                .build();
    }

    @Bean
    public TokenSettings configuracaoDoToken(){
        return TokenSettings.builder()
                .accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED)
                .accessTokenTimeToLive(Duration.ofMinutes(60))
                .build();
    }


    @Bean
    public ClientSettings configuracaoDoClient(){
        return ClientSettings.builder()
                .requireAuthorizationConsent(false)
                .build();
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() throws Exception{
        RSAKey chaveRSA = gerarChaveRSA();

        JWKSet jwkSet = new JWKSet(chaveRSA);

        return new ImmutableJWKSet<>(jwkSet);
    }


    private RSAKey gerarChaveRSA() throws Exception{

        KeyPair parDeChaves;

        KeyPairGenerator geradorDeParDeChaves = KeyPairGenerator.getInstance("RSA");
        geradorDeParDeChaves.initialize(2048);
        parDeChaves = geradorDeParDeChaves.generateKeyPair();

        RSAPublicKey chavePublica  = (RSAPublicKey) parDeChaves.getPublic();

        RSAPrivateKey chavePrivada = (RSAPrivateKey) parDeChaves.getPrivate();

        return new RSAKey
                .Builder(chavePublica)
                .privateKey(chavePrivada)
                .keyID(UUID.randomUUID().toString())
                .build();
    }

    @Bean
    public JwtDecoder decodificadorJWT(JWKSource<SecurityContext> jwkSource){
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }

    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> jwtCustomize(){
        return context -> {
            Authentication principal = context.getPrincipal();

            List<String> authorities = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

            if (context.getTokenType().equals(OAuth2TokenType.ACCESS_TOKEN)){
                context
                        .getClaims()
                        .claim("role", authorities);
            }
        };
    }
}
