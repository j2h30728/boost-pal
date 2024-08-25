-- DropForeignKey
ALTER TABLE "AiComment" DROP CONSTRAINT "AiComment_aiBotId_fkey";

-- DropForeignKey
ALTER TABLE "AiComment" DROP CONSTRAINT "AiComment_postId_fkey";

-- AddForeignKey
ALTER TABLE "AiComment" ADD CONSTRAINT "AiComment_aiBotId_fkey" FOREIGN KEY ("aiBotId") REFERENCES "AiBot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiComment" ADD CONSTRAINT "AiComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
