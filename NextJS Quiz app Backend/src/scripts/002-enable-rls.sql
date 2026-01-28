-- Enable Row Level Security
ALTER TABLE quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE vraag ENABLE ROW LEVEL SECURITY;
ALTER TABLE antwoord ENABLE ROW LEVEL SECURITY;
ALTER TABLE spelsessie ENABLE ROW LEVEL SECURITY;
ALTER TABLE speler ENABLE ROW LEVEL SECURITY;
ALTER TABLE spelerspelsessie ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_answer ENABLE ROW LEVEL SECURITY;

-- Public read access voor quizzen, vragen en antwoorden
CREATE POLICY "Public can read quizzes" ON quiz FOR SELECT USING (true);
CREATE POLICY "Public can create quizzes" ON quiz FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update quizzes" ON quiz FOR UPDATE USING (true);

CREATE POLICY "Public can read questions" ON vraag FOR SELECT USING (true);
CREATE POLICY "Public can create questions" ON vraag FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update questions" ON vraag FOR UPDATE USING (true);

CREATE POLICY "Public can read answers" ON antwoord FOR SELECT USING (true);
CREATE POLICY "Public can create answers" ON antwoord FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update answers" ON antwoord FOR UPDATE USING (true);

-- Spelsessie policies
CREATE POLICY "Public can read sessions" ON spelsessie FOR SELECT USING (true);
CREATE POLICY "Public can create sessions" ON spelsessie FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update sessions" ON spelsessie FOR UPDATE USING (true);

-- Speler policies
CREATE POLICY "Public can read players" ON speler FOR SELECT USING (true);
CREATE POLICY "Public can create players" ON speler FOR INSERT WITH CHECK (true);

-- Spelerspelsessie policies
CREATE POLICY "Public can read session players" ON spelerspelsessie FOR SELECT USING (true);
CREATE POLICY "Public can create session players" ON spelerspelsessie FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update session players" ON spelerspelsessie FOR UPDATE USING (true);

-- Player answer policies
CREATE POLICY "Public can read player answers" ON player_answer FOR SELECT USING (true);
CREATE POLICY "Public can create player answers" ON player_answer FOR INSERT WITH CHECK (true);
