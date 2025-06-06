package com.utd.ti.soa.ebs_service.controller;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.utd.ti.soa.ebs_service.model.Product;
import com.utd.ti.soa.ebs_service.model.Send;
import com.utd.ti.soa.ebs_service.utils.Auth;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/esb")
public class ESBcontrollerProduct {
    private final WebClient webClient = WebClient.create();
    private final Auth auth = new Auth();

    @GetMapping(value = "/product", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<String>> getAllUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (!auth.validToken(token)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido"));
        }

        System.out.println("📤 Enviando solicitud a Node.js para obtener todos los productos");

        return webClient.get()
                .uri("http://api_products:3004/api/products")
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> ResponseEntity.ok().body(response))
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
                .onErrorResume(e ->
                        Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
    }

    @DeleteMapping(value = "/product/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<String>> deleteUser(@PathVariable("id") String id,
                                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (!auth.validToken(token)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no válido"));
        }

        return webClient.delete()
                .uri("http://api_products:3004/api/products/" + id)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> ResponseEntity.ok().body(response))
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
                .onErrorResume(e ->
                        Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
    }

    @PostMapping(value = "/product/crate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<String>> createSend(@RequestBody Product product,
        @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

        if (!auth.validToken(token)) {
                return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido"));
        }

        System.out.println("Enviando solicitud a Node.js product");
        
        return webClient.post()
                .uri("http://api_products:3004/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(product)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> {
                    System.out.println("✅ Respuesta del servicio Node.js: " + response);
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    return ResponseEntity.ok().headers(headers).body(response);
                })
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
                .onErrorResume(e ->
                        Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
    }

    @PatchMapping(value = "/product/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<String>> updateSend(@PathVariable("id") String id,
                                                   @RequestBody Product product,
                                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        if (!auth.validToken(token)) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido"));
        }

        return webClient.patch()
                .uri("http://api_products:3004/api/products/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(product)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> ResponseEntity.ok().body(response))
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString())))
                .onErrorResume(e ->
                        Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor")));
    }
}
