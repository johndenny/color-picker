-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
