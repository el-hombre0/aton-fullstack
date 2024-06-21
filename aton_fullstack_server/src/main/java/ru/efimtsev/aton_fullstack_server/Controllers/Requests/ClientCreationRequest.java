package ru.efimtsev.aton_fullstack_server.Controllers.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.efimtsev.aton_fullstack_server.Models.Status;
import ru.efimtsev.aton_fullstack_server.Models.User;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientCreationRequest {
    private String firstName;
    private String middleName;
    private String lastName;
    private LocalDate birthday;
    private Long inn;
//    private String responsibleFullName;
    private User user;
}
