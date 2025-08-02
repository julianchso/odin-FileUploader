/*
  Warnings:

  - You are about to drop the `FolderMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FolderMetadata" DROP CONSTRAINT "FolderMetadata_parentFolderId_fkey";

-- DropForeignKey
ALTER TABLE "FolderMetadata" DROP CONSTRAINT "FolderMetadata_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedFolder" DROP CONSTRAINT "SharedFolder_folderId_fkey";

-- DropTable
DROP TABLE "FolderMetadata";

-- CreateTable
CREATE TABLE "Metadata" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "Type" "Type" NOT NULL,
    "mimeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentFolderId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedFolder" ADD CONSTRAINT "SharedFolder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
