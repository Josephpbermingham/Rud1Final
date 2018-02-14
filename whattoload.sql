create database classmem;
\c classmem
create table students (
name text,
workshop text
);


insert into students(name,workshop) VALUES
        ('john bonipart','cpsc240'),
        ('alice hooligan','cpsc240'),
        ('nick leback','ventriloquy'),
        ('joe dimmagio','guitar'),
        ('mit peck','guitar'),
        ('an gerissues','meditation'),
        ('test thething','remedialLiteracy'),
        ('ignoremeplease nodont','vim'),
        ('a a','vim');
