create table folder (
    id int(20) not null auto_increment primary key,
    path varchar(100) not null,
    cover varchar(100),
    like_num int(5),
    dislike_num int(5),
    key_word varchar(100),
    create_time varchar(15) not null,
    update_time varchar(15) not null
);
