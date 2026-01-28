-- Tabel voor quizzen
CREATE TABLE IF NOT EXISTS quiz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel voor vragen
CREATE TABLE IF NOT EXISTS vraag (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  order_number INT NOT NULL,
  time_limit INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel voor antwoorden (multiple choice)
CREATE TABLE IF NOT EXISTS antwoord (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vraag_id UUID NOT NULL REFERENCES vraag(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  order_number INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel voor spelsessies (live games met room codes)
CREATE TABLE IF NOT EXISTS spelsessie (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
  room_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'waiting',
  current_question_index INT DEFAULT 0,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel voor spelers
CREATE TABLE IF NOT EXISTS speler (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel voor speler in een sessie (met score)
CREATE TABLE IF NOT EXISTS spelerspelsessie (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  speler_id UUID NOT NULL REFERENCES speler(id) ON DELETE CASCADE,
  spelsessie_id UUID NOT NULL REFERENCES spelsessie(id) ON DELETE CASCADE,
  score INT DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(speler_id, spelsessie_id)
);

-- Tabel voor antwoorden van spelers
CREATE TABLE IF NOT EXISTS player_answer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spelerspelsessie_id UUID NOT NULL REFERENCES spelerspelsessie(id) ON DELETE CASCADE,
  vraag_id UUID NOT NULL REFERENCES vraag(id) ON DELETE CASCADE,
  antwoord_id UUID REFERENCES antwoord(id) ON DELETE CASCADE,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  time_taken INT NOT NULL,
  UNIQUE(spelerspelsessie_id, vraag_id)
);

-- Indexes voor betere performance
CREATE INDEX IF NOT EXISTS idx_vraag_quiz_id ON vraag(quiz_id);
CREATE INDEX IF NOT EXISTS idx_antwoord_vraag_id ON antwoord(vraag_id);
CREATE INDEX IF NOT EXISTS idx_spelsessie_room_code ON spelsessie(room_code);
CREATE INDEX IF NOT EXISTS idx_spelsessie_status ON spelsessie(status);
CREATE INDEX IF NOT EXISTS idx_spelerspelsessie_spelsessie ON spelerspelsessie(spelsessie_id);
CREATE INDEX IF NOT EXISTS idx_player_answer_spelerspelsessie ON player_answer(spelerspelsessie_id);
