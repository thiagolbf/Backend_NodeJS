create type OS as enum ('Windows', 'Linux', 'MacOs');

create table if not exists developer_infos(
 "id" serial primary key,
  "developerSince" date not null,
  "preferredOS" OS not null
);

create table if not exists developers(
 "id" serial primary key,
 "name" varchar(50) not null,
 "email" varchar(50) unique not null,
 "developerInfoId" integer unique,
 foreign key ("developerInfoId") references developer_infos("id")
 on delete cascade
);

create table if not exists projects(
 "id" serial primary key,
  "name" varchar(50) not null,
  "description" text not null,
  "estimatedTime" varchar(20) not null,
  "repository" varchar(120) not null,
  "startDate" date not null,
  "endDate" date,
  "developerId" integer not null,
  foreign key ("developerId") references developers("id")
  on delete cascade 
);

create table if not exists technologies(
 "id" serial primary key,
 "name" varchar(30) not null 
);

insert into technologies ("name") values ('Javascript'), ('Python');
insert into technologies ("name") values ('React'), ('Express.Js'), ('HTML'), ('CSS'), ('Django'), ('PostgreSQL'), ('MongoDB');

create table if not exists projects_technologies(
  "id" serial primary key,
   "addedIn" date not null,
   "projectId" integer not null,
   "technologyId" integer not null,
   foreign key ("projectId") references projects ("id") on delete cascade,
   foreign key ("technologyId") references technologies ("id") on delete set null
);
	