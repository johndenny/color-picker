/*
  Warnings:

  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToColor" DROP CONSTRAINT "_CollectionToColor_B_fkey";

-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
ALTER COLUMN "hexadecimal" SET DATA TYPE TEXT,
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("hexadecimal");

-- AlterTable
ALTER TABLE "_CollectionToColor" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CollectionToColor" ADD CONSTRAINT "_CollectionToColor_B_fkey" FOREIGN KEY ("B") REFERENCES "Color"("hexadecimal") ON DELETE CASCADE ON UPDATE CASCADE;
