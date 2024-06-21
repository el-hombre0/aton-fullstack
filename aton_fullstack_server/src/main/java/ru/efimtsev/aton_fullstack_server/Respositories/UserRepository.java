package ru.efimtsev.aton_fullstack_server.Respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.efimtsev.aton_fullstack_server.Models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
