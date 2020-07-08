BEGIN;

TRUNCATE
  parkfinder_users,
  parkfinder_suggestions,
  parkfinder_comments
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

INSERT INTO parkfinder_suggestions (park_name, location)
VALUES 
('Indian Woodoats', 'Songjiang'),
('Ascending Wild Basil', 'Benjamin Constant'),
('Island Speedwell', 'Pitogo'),
('Sticky Florestina', 'Al Ḩawātah'),
('Urban''s Nakedwood', 'Gabú'),
('Sedge', 'Besançon'),
('Colorado Cinquefoil', 'Plaisir'),
('Tree Lavatera', 'Takamatsu-shi'),
('Palegreen Orchid', 'Manevychi'),
('Wavyleaf Twinevine', 'Kopidlno');

INSERT INTO parkfinder_comments (comment, subject, user_id, park_name)
VALUES 
('Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.','Nice Park',8, 'Yosemite National Park'),
('In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.','Cool Trails',11, 'Cabrillo National Monument'),
('Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.','No parking',9, 'Yosemite National Park'),
('Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.','Beautiful',14,'Yosemite National Park'),
('Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.','Would go again',13, 'Yosemite National Park'),
('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.','Random',7, 'Yosemite National Park'),
('Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.','Random',5, 'Yosemite National Park'),
('Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.','foggy',3, 'Yosemite National Park'),
('Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.','huge park',2, 'Yosemite National Park'),
('Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.','Cool!',9, 'Yosemite National Park'),
('Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.','neat',11,'Yosemite National Park'),
('In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.','Random',1,'Yosemite National Park'),
('In congue. Etiam justo. Etiam pretium iaculis justo.','subject',14,'Yosemite National Park'),
('Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.','Random',8,'Yosemite National Park'),
('Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.','Subject', 6, 'Yosemite National Park');

COMMIT;