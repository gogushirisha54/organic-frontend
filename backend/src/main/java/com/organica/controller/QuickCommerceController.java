package com.organica.controller;

import com.organica.entity.Coupon;
import com.organica.entity.ServiceablePincode;
import com.organica.service.CatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuickCommerceController {

    private final CatalogService catalogService;

    public QuickCommerceController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/pincodes")
    public ResponseEntity<List<ServiceablePincode>> getServiceablePincodes() {
        return ResponseEntity.ok(catalogService.getAllPincodes());
    }

    @GetMapping("/pincodes/check/{pincode}")
    public ResponseEntity<ServiceablePincode> checkPincode(@PathVariable String pincode) {
        return ResponseEntity.ok(catalogService.verifyPincode(pincode));
    }

    @GetMapping("/coupons")
    public ResponseEntity<List<Coupon>> getActiveCoupons() {
        return ResponseEntity.ok(catalogService.getAllCoupons());
    }
}
