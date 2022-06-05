CREATE TABLE BOOKMARKS
(
    ID    bigint not null
        constraint bookmarks_pkey
            primary key,
    TITLE varchar(50),
    LINK  varchar(500)
);