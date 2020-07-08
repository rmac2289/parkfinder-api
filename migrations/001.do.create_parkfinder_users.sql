CREATE TABLE parkfinder_users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);

CREATE TABLE parkfinder_suggestions (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  park_name TEXT NOT NULL,
  location TEXT NOT NULL
);

