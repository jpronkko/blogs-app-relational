CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Edgar Allan Poe', 'http://www.dpreview.com', 'Eureka');
INSERT INTO blogs (author, url, title) VALUES ('Michael Chan', 'https://reactpatterns.com/', 'React patterns');
INSERT INTO blogs (author, url, title) VALUES ('Juri Drevinski', 'http://www.helsinki.fi', 'Merovingian encounters');
