package com.organica.controller;

import com.organica.dto.CatalogDtos.PaginatedProductsResponse;
import com.organica.dto.CatalogDtos.ProductDto;
import com.organica.service.CatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final CatalogService catalogService;

    public ProductController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String dietaryType,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Boolean inStockOnly,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        return ResponseEntity.ok(
                catalogService.getProducts(
                        category,
                        subcategory,
                        brand,
                        dietaryType,
                        search,
                        sort,
                        inStockOnly,
                        maxPrice
                )
        );
    }

    @GetMapping("/paginated")
    public ResponseEntity<PaginatedProductsResponse> getPaginatedProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String subcategory,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String dietaryType,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Boolean inStockOnly,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "24") int size
    ) {
        return ResponseEntity.ok(
                catalogService.getPaginatedProducts(
                        category,
                        subcategory,
                        brand,
                        dietaryType,
                        search,
                        sort,
                        inStockOnly,
                        maxPrice,
                        page,
                        size
                )
        );
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<ProductDto>> getSearchSuggestions(
            @RequestParam(required = false) String q
    ) {
        return ResponseEntity.ok(catalogService.getSearchSuggestions(q));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(catalogService.getProductById(id));
    }
}
