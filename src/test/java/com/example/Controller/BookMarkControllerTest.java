package com.example.Controller;

import com.example.BookMark;
import com.example.BookmarksApplication;
import com.example.Service.BookMarkService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import org.springframework.security.test.context.support.WithMockUser;

@SpringBootTest(classes = BookmarksApplication.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
//@WithMockUser
public class BookMarkControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookMarkService bookMarkService;

    private String expectedJson(BookMark bookMark) throws JsonProcessingException, JSONException {
        ObjectMapper writer = new ObjectMapper();
        List<JSONObject> bookMarkArray = List.of(new JSONObject(writer.writeValueAsString(bookMark)));
        return bookMarkArray.toString();
    }

//    @BeforeEach
//    void setUp() {
//        bookMarkService = mock(BookMarkService.class);
//    }

//    @Test
//    void shouldGetListOfAllBookMarks() throws Exception {
//        BookMark bookMark = new BookMark("one", "one.com");
//        when(bookMarkService.getListOfAllBookMarks()).thenReturn(Collections.singletonList(bookMark));
//
//        mockMvc.perform(get("/bookmarks/list")).andExpect((content().json((expectedJson(bookMark)))));
//    }

    @Test
    void shouldBeAbleToReturnCreatedStatusWhenBookMarkDetailsAreSaved() throws Exception {
        String bookMarkAsJson="{title:\"two\",link:\"https://two.org/\"}";

        mockMvc.perform(post("/bookmarks/add").contentType(MediaType.APPLICATION_JSON)
                .content(bookMarkAsJson))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldDeleteBookMarkById() throws Exception {
        BookMark bookMark = new BookMark("one", "one.com");
        bookMarkService.save(bookMark);
        mockMvc.perform(
                delete("/bookmarks/{id}"));

        verify(bookMarkService, times(1)).deleteById(1L);
    }
}
