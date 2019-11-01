create table pic_info (
    id int(20) not null auto_increment primary key,
    path varchar(1024) not null,
    width varchar(10) not null,
    height varchar(10) not null,
    aspect_ratio float(3,2) not null,
    like_num int(5),
    dislike_num int(5),
    keyword varchar(100),
    create_time varchar(15) not null,
    update_time varchar(15) not null
);