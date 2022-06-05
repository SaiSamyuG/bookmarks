package com.example.Service;

import com.example.BookMark;
import com.example.Repository.BookMarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookMarkService {
    private final BookMarkRepository bookMarkRepository;

    @Autowired
    public BookMarkService(BookMarkRepository bookMarkRepository) {
        this.bookMarkRepository = bookMarkRepository;
    }

    public Page<BookMark> getListOfAllBookMarks(Pageable pageable) {
        System.out.println(bookMarkRepository.findAll());
        return (Page<BookMark>) bookMarkRepository.findAll(pageable);
    }

    public BookMark save(BookMark bookMark) {
//        if (bookMarkRepository.existsById(bookMark.getId())) {
//            BookMark existedBookMark = bookMarkRepository.getById(bookMark.getId());
//            existedBookMark.setLink(bookMark.getLink());
//            existedBookMark.setTitle(bookMark.getTitle());
//            return existedBookMark;
//        }
        return bookMarkRepository.save(bookMark);
    }

    public void deleteById(Long id) {
        bookMarkRepository.deleteById(id);
    }
}
