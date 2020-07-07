BEGIN;

TRUNCATE
  hearsay_users
  RESTART IDENTITY CASCADE;

INSERT INTO parkfinder_users (user_name, full_name, password
) VALUES
('hbarkworth0', 'Herculie Barkworth','1R7PAhBbT'),
('asowray1','Allistir Sowray','Ff69xb0s'),
('hgumly2','Holly-anne Gumly','QxPbzQ'),
('mcoyett3','Minta Coyett','vcr9XwDPFUia'),
('aransfield4','Abagail Ransfield','YS6pMqfJLt'),
('mluckin5','Minne Luckin','cKvgY0'),
('hattfield6','Humbert Attfield','M6fKAYasfBoQ'),
('hlaye7','Hanan Laye','fpKhUh'),
('imansbridge8','Idalina Mansbridge','xFzli8K2'),
('pdelepine9','Papageno Delepine','suZ2g0'),
('mhannaa','Malcolm Hanna','wCJF36d'),
('arosleb','Agretha Rosle','SHG90Yx23'),
('kantoniottiic','Kerwinn Antoniottii','t4NaAX6xQQg'),
('roldalld','Roscoe Oldall','VfUUfZ8viBp'),
('sbordere','Siffre Border','nmkc4u');

COMMIT;