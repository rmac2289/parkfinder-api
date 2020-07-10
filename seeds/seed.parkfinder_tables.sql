BEGIN;

TRUNCATE
  parkfinder_users,
  parkfinder_suggestions,
  parkfinder_comments
  RESTART IDENTITY CASCADE;

INSERT INTO parkfinder_users (user_name, full_name, password, email
) VALUES
('hbarkworth0', 'Herculie Barkworth','1R7PAhBbT', 'test@test.com'),
('asowray1','Allistir Sowray','Ff69xb0s', 'test2@test2.com'),
('hgumly2','Holly-anne Gumly','QxPbzQ', 'test3@test3.com'),
('mcoyett3','Minta Coyett','vcr9XwDPFUia', 'test4@test4.com'),
('aransfield4','Abagail Ransfield','YS6pMqfJLt', 'test5@test5.com'),
('mluckin5','Minne Luckin','cKvgY0', 'test6@test6.com'),
('hattfield6','Humbert Attfield','M6fKAYasfBoQ', 'test7@test7.com'),
('hlaye7','Hanan Laye','fpKhUh', 'test8@test8.com'),
('imansbridge8','Idalina Mansbridge','xFzli8K2', 'test9@test9.com'),
('pdelepine9','Papageno Delepine','suZ2g0', 'test10@test10.com'),
('mhannaa','Malcolm Hanna','wCJF36d', 'test11@test11.com'),
('arosleb','Agretha Rosle','SHG90Yx23', 'test12@test12.com'),
('kantoniottiic','Kerwinn Antoniottii','t4NaAX6xQQg', 'test13@test13.com'),
('roldalld','Roscoe Oldall','VfUUfZ8viBp', 'test14@test14.com'),
('sbordere','Siffre Border','nmkc4u', 'test15@test15.com');

INSERT INTO parkfinder_suggestions (park_name, location, description)
VALUES 
('Indian Woodoats', 'Songjiang', 'fake park description'),
('Ascending Wild Basil', 'Benjamin Constant', 'fake park description'),
('Island Speedwell', 'Pitogo', 'fake park description'),
('Sticky Florestina', 'Al Ḩawātah', 'fake park description'),
('Urban''s Nakedwood', 'Gabú', 'fake park description'),
('Sedge', 'Besançon', 'fake park description'),
('Colorado Cinquefoil', 'Plaisir', 'fake park description'),
('Tree Lavatera', 'Takamatsu-shi', 'fake park description'),
('Palegreen Orchid', 'Manevychi', 'fake park description'),
('Wavyleaf Twinevine', 'Kopidlno', 'fake park description');

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