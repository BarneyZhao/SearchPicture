create table folder (
    id int(20) not null auto_increment primary key,
    path varchar(1024) not null,
    cover varchar(1024),
    pages int(5),
    like_num int(5),
    dislike_num int(5),
    keyword varchar(100),
    create_time varchar(15) not null,
    update_time varchar(15) not null
);
