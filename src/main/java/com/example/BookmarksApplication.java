package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication(scanBasePackages = {"com.example"}, exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
@SpringBootApplication
//@EnableJpaRepositories
public class BookmarksApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookmarksApplication.class, args);
    }
}
