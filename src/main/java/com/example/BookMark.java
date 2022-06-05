package com.example;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "bookmarks")
public class BookMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    @NotBlank(message = "Please enter title")
    @Size(max=50, message = "Title should not be greater than 50 characters")
    private String title;

    @Column(name = "link")
    @NotBlank(message = "Please enter link")
    @Size(max=500, message = "Title should not be greater than 500 characters")
    private String link;

    public BookMark(String title, String link) {
        this.title = title;
        this.link = link;
    }

    public BookMark() {

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
