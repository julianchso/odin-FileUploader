import prisma from '../database/prismaClient.js';

const createNewFile = async (
  name: string,
  mimetype: string,
  userId: string,
  parentFolderId: string | null,
  size: number
) => {
  return await prisma.metadata.create({
    data: {
      name: name,
      type: 'FILE',
      mimeType: mimetype,
      userId: userId,
      parentFolderId: parentFolderId,
      size: size,
    },
  });
};

const getFileInfo = async (id: string) => {
  return await prisma.metadata.findUnique({
    where: {
      id: id,
    },
  });
};

const getBreadcrumbs = async (id: string, breadcrumbs: Breadcrumbs[] = []) => {
  let currentId: string | undefined = id;

  const folder = await prisma.metadata.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      parentFolderId: true,
    },
  });

  if (folder) {
    breadcrumbs.unshift({ id: folder.id, folderName: folder.name });
  }

  if (folder?.parentFolderId) {
    currentId = folder.parentFolderId;
    return getBreadcrumbs(currentId, breadcrumbs);
  } else {
    console.log(`breadcrumbs inside if: ${breadcrumbs}`);
    return breadcrumbs;
  }
};

export { createNewFile, getBreadcrumbs, getFileInfo };
