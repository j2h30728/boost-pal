/*
  Warnings:

  - Added the required column `userId` to the `AiComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AiComment" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "AiComment_userId_idx" ON "AiComment"("userId");

-- AddForeignKey
ALTER TABLE "AiComment" ADD CONSTRAINT "AiComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
