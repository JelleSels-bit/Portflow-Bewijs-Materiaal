/*
  Warnings:

  - Made the column `description` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Theme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Theme" ALTER COLUMN "description" SET NOT NULL;
