/*
  Warnings:

  - You are about to drop the `folderMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SharedFolder" DROP CONSTRAINT "SharedFolder_folderId_fkey";

-- DropForeignKey
ALTER TABLE "folderMetadata" DROP CONSTRAINT "folderMetadata_parentFolderId_fkey";

-- DropForeignKey
ALTER TABLE "folderMetadata" DROP CONSTRAINT "folderMetadata_userId_fkey";

-- DropTable
DROP TABLE "folderMetadata";

-- CreateTable
CREATE TABLE "FolderMetadata" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "mimeType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentFolderId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FolderMetadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FolderMetadata" ADD CONSTRAINT "FolderMetadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderMetadata" ADD CONSTRAINT "FolderMetadata_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "FolderMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedFolder" ADD CONSTRAINT "SharedFolder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FolderMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
