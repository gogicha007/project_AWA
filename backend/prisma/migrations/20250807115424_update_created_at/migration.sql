/*
  Warnings:

  - You are about to drop the column `updated_at` on the `project` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "milestone" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "progress" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "updated_at",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "updated_at" DROP DEFAULT;
