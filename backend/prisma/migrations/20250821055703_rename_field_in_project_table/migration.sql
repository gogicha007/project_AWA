/*
  Warnings:

  - You are about to drop the column `progress` on the `project` table. All the data in the column will be lost.
  - Added the required column `status` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('active', 'completed', 'inProgress', 'onHold');

-- AlterTable
ALTER TABLE "project" DROP COLUMN "progress",
ADD COLUMN     "status" "ProjectStatus" NOT NULL;
