package com.organica.repository;

import com.organica.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySlugIgnoreCase(String slug);
    Optional<Product> findBySkuIgnoreCase(String sku);
    List<Product> findByCategorySlugIgnoreCase(String categorySlug);
    long countByCategoryId(Long categoryId);
}
