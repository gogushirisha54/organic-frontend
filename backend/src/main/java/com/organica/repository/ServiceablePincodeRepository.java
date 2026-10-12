package com.organica.repository;

import com.organica.entity.ServiceablePincode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ServiceablePincodeRepository extends JpaRepository<ServiceablePincode, Long> {
    Optional<ServiceablePincode> findByPincode(String pincode);
}
