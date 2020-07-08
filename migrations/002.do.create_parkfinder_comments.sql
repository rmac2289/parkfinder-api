CREATE TABLE parkfinder_comments (
    user_id INTEGER REFERENCES parkfinder_users(id)
      ON DELETE SET NULL,
    park_name TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT now() NOT NULL,
    subject TEXT NOT NULL,
    comment TEXT NOT NULL
);

