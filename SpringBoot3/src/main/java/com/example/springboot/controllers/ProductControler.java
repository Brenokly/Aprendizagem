package com.example.springboot.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.example.springboot.dtos.ProductRecordDto;
import com.example.springboot.models.ProductModel;
import com.example.springboot.repositories.ProductRepositoy;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

// Nível de Maturidade de uma API segundo Leonard Richi..
// 0° - A api deve utilizar o protocolo HTTP
// 1° - Ter recursos bem definidos e o correto uso das URI'S (Uniform Resource Identifier)
// 2° - Utilizar os métodos HTTP de forma semântica

@RestController
public class ProductControler {

  @Autowired
  ProductRepositoy productRepositoy;

  @PostMapping("/products") // Protocolo HTTP
  public ResponseEntity<ProductModel> saveProduct(@RequestBody @Valid ProductRecordDto productRecordDto) {
    var productModel = new ProductModel();
    BeanUtils.copyProperties(productRecordDto, productModel);
    return ResponseEntity.status(HttpStatus.CREATED).body(productRepositoy.save(productModel));
  }

  @GetMapping("/products")
  public ResponseEntity<List<ProductModel>> getAllProduct() {
    List<ProductModel> productList = productRepositoy.findAll();

    if (!productList.isEmpty()) {
      for (ProductModel product : productList) {
        UUID id = product.getIdProduct();
        product.add(linkTo(methodOn(ProductControler.class).getOneProduct(id)).withSelfRel());
      }
    }
    return ResponseEntity.status(HttpStatus.OK).body(productList);
  }

  @GetMapping("/products/{id}")
  public ResponseEntity<Object> getOneProduct(@PathVariable(value = "id") UUID id) {
    Optional<ProductModel> product0 = productRepositoy.findById(id);
    if (product0.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
    }
    product0.get().add(linkTo(methodOn(ProductControler.class).getAllProduct()).withSelfRel());
    return ResponseEntity.status(HttpStatus.OK).body(product0.get());
  }

  @PutMapping("products/{id}")
  public ResponseEntity<Object> putProduct(@PathVariable(value = "id") UUID id,
      @RequestBody @Valid ProductRecordDto entity) {
    Optional<ProductModel> product0 = productRepositoy.findById(id);
    if (product0.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }
    var productModel = product0.get();
    BeanUtils.copyProperties(entity, productModel);
    return ResponseEntity.status(HttpStatus.OK).body(productRepositoy.save(productModel));
  }

  @DeleteMapping("products/{id}")
  public ResponseEntity<Object> deleteProduct(@PathVariable(value = "id") UUID id) {
    Optional<ProductModel> product0 = productRepositoy.findById(id);
    if (product0.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
    }
    productRepositoy.delete(product0.get());
    return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfuly");
  }
}