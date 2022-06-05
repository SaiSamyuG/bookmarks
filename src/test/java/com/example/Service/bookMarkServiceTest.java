package com.example.Service;

import com.example.BookMark;
import com.example.Repository.BookMarkRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;

public class bookMarkServiceTest {

    private BookMarkRepository bookMarkRepository;
    private BookMarkService bookMarkService;

    @BeforeEach
    void setUp() {
        bookMarkRepository = mock(BookMarkRepository.class);
        bookMarkService = new BookMarkService(bookMarkRepository);
    }

//    @Test
//    public void shouldGetListOfAllBookMarks() {
//        //List<BookMark> expectedListOfBookMarks = new ArrayList<>();
//        expectedListOfBookMarks.add(new BookMark("google", "https://google.com"));
//        when(bookMarkRepository.findAll()).thenReturn(expectedListOfBookMarks);
//        //List<BookMark> actualListOfBookMarks = bookMarkService.getListOfAllBookMarks();
//        //System.out.println(actualListOfBookMarks);
//
//        verify(bookMarkRepository, times(1)).findAll();
//        //assertEquals(expectedListOfBookMarks, actualListOfBookMarks);
//    }

    @Test
    public void shouldSaveBookMark() {
        BookMark bookMark = new BookMark("one", "one.com");
        bookMarkService.save(bookMark);

        verify(bookMarkRepository, times(1)).save(bookMark);
    }

    @Test
    public void shouldDeleteBookMarkById(){
        BookMark bookMark = new BookMark("one", "one.com");

        when(bookMarkRepository.findById(1L)).thenReturn(java.util.Optional.of(bookMark));
        bookMarkService.deleteById(1L);

        verify(bookMarkRepository, times(1)).deleteById(1L);
    }
}
