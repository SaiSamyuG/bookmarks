package com.example.Controller;

import com.example.BookMark;
import com.example.Service.BookMarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/bookmarks")
public class BookMarkController {
    private final BookMarkService bookMarkService;

    @Autowired
    public BookMarkController(BookMarkService bookMarkService) {
        this.bookMarkService = bookMarkService;
    }

    @GetMapping("/list")
    public Page<BookMark> getListOfBookMarks(Pageable pageable) {
        return bookMarkService.getListOfAllBookMarks(pageable);
    }

    @PostMapping("/add")
    public ResponseEntity<BookMark> saveBookMark(@Valid @RequestBody BookMark bookMark) {
        return new ResponseEntity<BookMark>(bookMarkService.save(bookMark), HttpStatus.CREATED);
        //return bookMarkService.save(bookMark);
    }

    @DeleteMapping("/{id}")
    public void deleteBookMark(@PathVariable Long id) {
        bookMarkService.deleteById(id);
    }
}
