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
  (1, 1, CONCAT(E'\u5716', E'\u66f8', E'\u9928', E'\u000d', E'\u000a'), 'library', 2), -- '圖書館'
  (2, 1, CONCAT(E'\u96fb', E'\u8166', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'computer', 3), -- '電腦'
  (3, 1, CONCAT(E'\u62b1', E'\u6b49', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'sorry', 4), --'抱歉'
  (4, 1, CONCAT(E'\u8b1d', E'\u8b1d', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'thank you', 5), --'謝謝'
  (5, 1, CONCAT(E'\u98df', E'\u7269', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'food', 6), --'食物'
  (6, 1, CONCAT(E'\u6c34', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'water', 7), --'水'
  (7, 1, CONCAT(E'\u684c', E'\u5b50', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'table', 8), --'桌子'
  (8, 1, CONCAT(E'\u52d5', E'\u7269', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'animal', 9), --'動物'
  (9, 1, CONCAT(E'\u5ec1', E'\u6240', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'restroom', 10), --'廁所'
  (10, 1, CONCAT(E'\u8eca', E'\u5b50', E'\u000d', E'\u000a', E'\u000d', E'\u000a'), 'car', null); --'車子'

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
