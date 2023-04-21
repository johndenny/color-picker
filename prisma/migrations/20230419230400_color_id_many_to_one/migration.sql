/*
  Warnings:

  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_CollectionToColor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectionId` to the `Color` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Color` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToColor" DROP CONSTRAINT "_CollectionToColor_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToColor" DROP CONSTRAINT "_CollectionToColor_B_fkey";

-- DropIndex
DROP INDEX "Color_hexadecimal_key";

-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
ADD COLUMN     "collectionId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_CollectionToColor";

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
