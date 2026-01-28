-- @param {String} $1:gameSessionId The id of the game session
-- @param {String} $2:userId The id of te user

INSERT INTO "UserGameSession" ("id", "gameSessionId", "userId", "score")
VALUES (gen_random_uuid(), $1, $2, 0)
    ON CONFLICT ("userId", "gameSessionId")
DO NOTHING;