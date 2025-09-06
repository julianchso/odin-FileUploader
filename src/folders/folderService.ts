import { getPath as getParentPath } from './folderPrisma.js';

const getPath = async (userId: string, parentId: string | null, folderId: string) => {
  if (parentId == null) {
    return `${userId}/${folderId}`;
  }

  const parentPath = await getParentPath(parentId);
  const path = `${parentPath}/${folderId}`;
  return path;
};

export { getPath };
