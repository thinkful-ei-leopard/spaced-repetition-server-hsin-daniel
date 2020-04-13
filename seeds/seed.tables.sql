BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Mandarin', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, '圖書館', 'library', 2),
  (2, 1, '電腦', 'computer', 3),
  (3, 1, '抱歉', 'sorry', 4),
  (4, 1, '謝謝', 'thank you', 5),
  (5, 1, '食物', 'food', 6),
  (6, 1, '水', 'water', 7),
  (7, 1, '桌子', 'table', 8),
  (8, 1, '動物', 'animal', 9),
  (9, 1, '廁所', 'restroom', 10),
  (10, 1, '車子', 'car', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
