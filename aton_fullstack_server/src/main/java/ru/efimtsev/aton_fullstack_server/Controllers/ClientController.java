package ru.efimtsev.aton_fullstack_server.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.efimtsev.aton_fullstack_server.Controllers.Requests.ClientCreationRequest;
import ru.efimtsev.aton_fullstack_server.Controllers.Responses.ClientResponse;
import ru.efimtsev.aton_fullstack_server.Controllers.Services.ClientService;
import ru.efimtsev.aton_fullstack_server.Exceptions.ResourceNotFoundException;
import ru.efimtsev.aton_fullstack_server.Models.Client;
import ru.efimtsev.aton_fullstack_server.Models.Status;
import ru.efimtsev.aton_fullstack_server.Respositories.ClientRepository;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientRepository clientRepo;
    private final ClientService service;

    @GetMapping("/test")
    private String TestPoint(){
        return "Test is OK!";
    }
    @GetMapping("/")
    private ResponseEntity<List<Client>> getAllClients(){
        List<Client> clients = clientRepo.findAll();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @PostMapping("/")
    private ResponseEntity<ClientResponse> addClient(@RequestBody ClientCreationRequest request){
        return ResponseEntity.ok(service.addClient(request));

    }

    @PatchMapping("/status")
    private ResponseEntity<Client> changeStatus(@PathVariable Long clientId, Status status){
        Optional<Client> optionalClient = clientRepo.findById(clientId);
        Client client = optionalClient.orElseThrow(() -> new ResourceNotFoundException("Client with id: " + clientId + "doesn't exist"));
        client.setStatus(status);
        clientRepo.save(client);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }
}
