package com.organica;

import com.organica.dto.AuthDtos.AuthResponse;
import com.organica.dto.AuthDtos.LoginRequest;
import com.organica.dto.AuthDtos.RegisterRequest;
import com.organica.entity.Role;
import com.organica.entity.User;
import com.organica.repository.UserRepository;
import com.organica.security.JwtTokenProvider;
import com.organica.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class AuthServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        passwordEncoder = new BCryptPasswordEncoder(10);
        jwtTokenProvider = new JwtTokenProvider(
                "organica_unit_test_secret_key_minimum_32_characters_long_2026",
                3600000L
        );
        authService = new AuthService(userRepository, passwordEncoder, jwtTokenProvider);
    }

    @Test
    void registerHashesPasswordWithBCryptAndGeneratesValidJwt() {
        when(userRepository.existsByEmailIgnoreCase("newuser@organica.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(15L);
            // Ensure plain-text password is NEVER stored
            assertNotEquals("PlainSecret@123", u.getPasswordHash());
            assertTrue(passwordEncoder.matches("PlainSecret@123", u.getPasswordHash()));
            return u;
        });

        RegisterRequest req = new RegisterRequest();
        req.setFullName("Marcus Lindqvist");
        req.setEmail("newuser@organica.com");
        req.setPassword("PlainSecret@123");
        req.setPhone("555-0100");
        req.setAddress("120 Olive St");
        req.setCity("San Francisco");
        req.setState("CA");
        req.setPostalCode("94102");

        AuthResponse res = authService.register(req);

        assertNotNull(res.getToken());
        assertTrue(jwtTokenProvider.validateToken(res.getToken()));
        assertEquals("newuser@organica.com", jwtTokenProvider.getEmailFromToken(res.getToken()));
        assertEquals(Role.ROLE_CUSTOMER, res.getUser().getRole());
    }

    @Test
    void loginVerifiesBCryptHashAndReturnsJwt() {
        User existing = new User();
        existing.setId(2L);
        existing.setFullName("Admin User");
        existing.setEmail("admin@organica.com");
        existing.setPasswordHash(passwordEncoder.encode("Admin@123"));
        existing.setRole(Role.ROLE_ADMIN);

        when(userRepository.findByEmailIgnoreCase("admin@organica.com")).thenReturn(Optional.of(existing));

        LoginRequest loginReq = new LoginRequest();
        loginReq.setEmail("admin@organica.com");
        loginReq.setPassword("Admin@123");

        AuthResponse res = authService.login(loginReq);
        assertTrue(jwtTokenProvider.validateToken(res.getToken()));
        assertEquals(Role.ROLE_ADMIN, res.getUser().getRole());
    }
}
