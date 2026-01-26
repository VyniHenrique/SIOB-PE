package com.siob_pe.siob_pe.config;

import com.siob_pe.siob_pe.security.CustomUserDetailsService;
import com.siob_pe.siob_pe.service.UsuarioService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecutityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf( csrf -> csrf.disable())
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .authorizeHttpRequests(authorize -> {

                    authorize.requestMatchers("/usuario/**").hasAnyRole("ADMIN", "CHEFE");
                    authorize.requestMatchers("/livros/**").hasAnyRole("ADMIN", "CHEFE", "ANALISTA");
//                  authorize.requestMatchers(HttpMethod.POST,"/usuario/**").hasRole("ADMIN"); (utilizando o HttpMethod)
                    authorize.anyRequest().authenticated();
                })
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public UserDetailsService userDetailsService(UsuarioService usuarioService){
        return new CustomUserDetailsService(usuarioService);
    }
}
