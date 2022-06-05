package com.example.Repository;

import com.example.BookMark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMarkRepository extends PagingAndSortingRepository<BookMark, Long> {

    Page<BookMark> findAll(Pageable pageable);
}
