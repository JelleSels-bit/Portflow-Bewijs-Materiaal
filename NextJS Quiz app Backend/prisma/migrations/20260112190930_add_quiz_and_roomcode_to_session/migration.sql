/*
  Warnings:

  - A unique constraint covering the columns `[roomcode]` on the table `GameSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quizId` to the `GameSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomcode` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "quizId" UUID NOT NULL,
ADD COLUMN     "roomcode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_roomcode_key" ON "GameSession"("roomcode");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
