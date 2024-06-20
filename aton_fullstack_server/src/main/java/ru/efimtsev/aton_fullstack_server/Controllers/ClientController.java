package ru.efimtsev.aton_fullstack_server.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.efimtsev.aton_fullstack_server.Exceptions.ResourceNotFoundException;
import ru.efimtsev.aton_fullstack_server.Models.Client;
import ru.efimtsev.aton_fullstack_server.Models.Status;
import ru.efimtsev.aton_fullstack_server.Respositories.ClientRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private ClientRepository clientRepo;

    @GetMapping("/")
    private ResponseEntity<List<Client>> getAllClients(){
        List<Client> clients = clientRepo.findAll();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }
    @PatchMapping("/client_status")
    private ResponseEntity<Client> changeStatus(@PathVariable Long clientId, Status status){
        Optional<Client> optionalClient = clientRepo.findById(clientId);
        Client client = optionalClient.orElseThrow(() -> new ResourceNotFoundException("Client with id: " + clientId + "doesn't exist"));
        client.setStatus(status);
        clientRepo.save(client);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }
}
