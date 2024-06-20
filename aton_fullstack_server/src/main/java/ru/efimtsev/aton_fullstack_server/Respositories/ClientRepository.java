package ru.efimtsev.aton_fullstack_server.Respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.efimtsev.aton_fullstack_server.Models.Client;
public interface ClientRepository extends JpaRepository<Client, Long> {
}
