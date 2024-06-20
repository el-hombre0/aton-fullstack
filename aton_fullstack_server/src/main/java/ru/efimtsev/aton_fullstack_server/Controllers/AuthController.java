package ru.efimtsev.aton_fullstack_server.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.efimtsev.aton_fullstack_server.Controllers.Requests.AuthenticationRequest;
import ru.efimtsev.aton_fullstack_server.Controllers.Requests.RegisterRequest;
import ru.efimtsev.aton_fullstack_server.Controllers.Responses.AuthenticationResponse;
import ru.efimtsev.aton_fullstack_server.Controllers.Services.AuthenticationService;
import ru.efimtsev.aton_fullstack_server.Respositories.UserRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {

        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {

        return ResponseEntity.ok(service.authenticate(request));
    }
}
