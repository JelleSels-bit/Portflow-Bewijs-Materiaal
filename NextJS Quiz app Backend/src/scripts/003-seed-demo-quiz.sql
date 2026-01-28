-- Demo quiz voor testen
INSERT INTO quiz (id, title, description) 
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Algemene Kennis Quiz',
  'Een leuke quiz om je algemene kennis te testen!'
) ON CONFLICT DO NOTHING;

-- Vraag 1
INSERT INTO vraag (id, quiz_id, question_text, order_number, time_limit)
VALUES (
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000001',
  'Wat is de hoofdstad van Nederland?',
  1,
  20
) ON CONFLICT DO NOTHING;

INSERT INTO antwoord (vraag_id, answer_text, is_correct, order_number)
VALUES 
  ('00000000-0000-0000-0000-000000000011', 'Amsterdam', true, 1),
  ('00000000-0000-0000-0000-000000000011', 'Rotterdam', false, 2),
  ('00000000-0000-0000-0000-000000000011', 'Den Haag', false, 3),
  ('00000000-0000-0000-0000-000000000011', 'Utrecht', false, 4)
ON CONFLICT DO NOTHING;

-- Vraag 2
INSERT INTO vraag (id, quiz_id, question_text, order_number, time_limit)
VALUES (
  '00000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000001',
  'Hoeveel planeten zijn er in ons zonnestelsel?',
  2,
  20
) ON CONFLICT DO NOTHING;

INSERT INTO antwoord (vraag_id, answer_text, is_correct, order_number)
VALUES 
  ('00000000-0000-0000-0000-000000000012', '7', false, 1),
  ('00000000-0000-0000-0000-000000000012', '8', true, 2),
  ('00000000-0000-0000-0000-000000000012', '9', false, 3),
  ('00000000-0000-0000-0000-000000000012', '10', false, 4)
ON CONFLICT DO NOTHING;

-- Vraag 3
INSERT INTO vraag (id, quiz_id, question_text, order_number, time_limit)
VALUES (
  '00000000-0000-0000-0000-000000000013',
  '00000000-0000-0000-0000-000000000001',
  'In welk jaar viel de Berlijnse Muur?',
  3,
  20
) ON CONFLICT DO NOTHING;

INSERT INTO antwoord (vraag_id, answer_text, is_correct, order_number)
VALUES 
  ('00000000-0000-0000-0000-000000000013', '1987', false, 1),
  ('00000000-0000-0000-0000-000000000013', '1989', true, 2),
  ('00000000-0000-0000-0000-000000000013', '1991', false, 3),
  ('00000000-0000-0000-0000-000000000013', '1993', false, 4)
ON CONFLICT DO NOTHING;

-- Vraag 4
INSERT INTO vraag (id, quiz_id, question_text, order_number, time_limit)
VALUES (
  '00000000-0000-0000-0000-000000000014',
  '00000000-0000-0000-0000-000000000001',
  'Wie schilderde de Mona Lisa?',
  4,
  20
) ON CONFLICT DO NOTHING;

INSERT INTO antwoord (vraag_id, answer_text, is_correct, order_number)
VALUES 
  ('00000000-0000-0000-0000-000000000014', 'Vincent van Gogh', false, 1),
  ('00000000-0000-0000-0000-000000000014', 'Leonardo da Vinci', true, 2),
  ('00000000-0000-0000-0000-000000000014', 'Pablo Picasso', false, 3),
  ('00000000-0000-0000-0000-000000000014', 'Rembrandt', false, 4)
ON CONFLICT DO NOTHING;

-- Vraag 5
INSERT INTO vraag (id, quiz_id, question_text, order_number, time_limit)
VALUES (
  '00000000-0000-0000-0000-000000000015',
  '00000000-0000-0000-0000-000000000001',
  'Wat is het grootste zoogdier ter wereld?',
  5,
  20
) ON CONFLICT DO NOTHING;

INSERT INTO antwoord (vraag_id, answer_text, is_correct, order_number)
VALUES 
  ('00000000-0000-0000-0000-000000000015', 'Afrikaanse olifant', false, 1),
  ('00000000-0000-0000-0000-000000000015', 'Blauwe vinvis', true, 2),
  ('00000000-0000-0000-0000-000000000015', 'Giraffe', false, 3),
  ('00000000-0000-0000-0000-000000000015', 'Ijsbeer', false, 4)
ON CONFLICT DO NOTHING;
