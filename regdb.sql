create table towns(
    
     id char(2) not null primary key,
     towns_locations text not null
   
    
);

create table reg_numbers(
    id serial not null primary key,  
    reg_nums text not null,
    towns_id char(2) not null,
    
    foreign key (towns_id)  references towns(id)
);
insert into towns (id,towns_locations) values('CA','CAPE TOWN'); 
insert into towns (id,towns_locations) values('CY','BELLVILLE');
insert into towns (id,towns_locations) values('CW','WORCESTER');
alter table towns add constraint uniq_desc_constraint unique(id);

