package ru.efimtsev.aton_fullstack_server.Controllers.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.efimtsev.aton_fullstack_server.Controllers.Requests.ClientCreationRequest;
import ru.efimtsev.aton_fullstack_server.Controllers.Responses.ClientResponse;
import ru.efimtsev.aton_fullstack_server.Exceptions.ResourceNotFoundException;
import ru.efimtsev.aton_fullstack_server.Models.Client;
import ru.efimtsev.aton_fullstack_server.Models.Status;
import ru.efimtsev.aton_fullstack_server.Models.User;
import ru.efimtsev.aton_fullstack_server.Respositories.ClientRepository;
import ru.efimtsev.aton_fullstack_server.Respositories.UserRepository;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final UserRepository userRepo;
    private final ClientRepository clientRepo;
    public ClientResponse addClient(ClientCreationRequest request){
        User user = userRepo.findByUsername(request.getUser().getUsername()).orElseThrow(
                () -> new ResourceNotFoundException("User with username: " + request.getUser().getUsername() +
                        "doesn't exist"));

        Client client = Client.builder()
                .firstName(request.getFirstName())
                .middleName(request.getMiddleName())
                .lastName(request.getLastName())
                .birthday(request.getBirthday())
                .inn(request.getInn())
//                .responsibleFullName(request.getResponsibleFullName())
                .user(user)
                .status(Status.NOT_IN_PROCESS)
                .build();
        clientRepo.save(client);
        return ClientResponse.builder()
                .id(client.getId())
                .firstName(client.getFirstName())
                .firstName(client.getFirstName())
                .middleName(client.getMiddleName())
                .lastName(client.getLastName())
                .birthday(client.getBirthday())
                .inn(client.getInn())
//                .responsibleFullName(client.getResponsibleFullName())
                .user(client.getUser())
                .status(client.getStatus())
                .build();
    }
}