package ru.efimtsev.aton_fullstack_server.Controllers.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.efimtsev.aton_fullstack_server.Controllers.Requests.RegisterRequest;
import ru.efimtsev.aton_fullstack_server.Controllers.Responses.AuthenticationResponse;
import ru.efimtsev.aton_fullstack_server.Models.User;
import ru.efimtsev.aton_fullstack_server.Respositories.UserRepository;
import ru.efimtsev.aton_fullstack_server.Security.JwtService;
import ru.efimtsev.aton_fullstack_server.Controllers.Requests.AuthenticationRequest;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final  AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder().fullName(request.getFullName()).login(request.getLogin()).password(passwordEncoder.encode(request.getPassword())).build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .fullName(user.getFullName())
                .login(user.getLogin())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));
        var user = userRepository.findByLogin(request.getLogin()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .fullName(user.getFullName())
                .login(user.getLogin())
                .build();
    }
}
