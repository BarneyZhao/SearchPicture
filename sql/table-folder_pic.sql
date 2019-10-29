create table folder_pic (
    id int(20) not null auto_increment primary key,
    folder_id int(20) not null,
    path varchar(100) not null,
    create_time varchar(15) not null,
    update_time varchar(15) not null
);
