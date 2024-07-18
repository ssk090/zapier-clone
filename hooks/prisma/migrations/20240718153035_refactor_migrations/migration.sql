/*
  Warnings:

  - You are about to drop the column `availableActionId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the `AvailableTriggers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- DropIndex
DROP INDEX "Action_zapId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "availableActionId",
ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "AvailableTriggers";

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
