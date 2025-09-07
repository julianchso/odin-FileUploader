import { getPath as getParentPath, getAllPaths, getAllFolderNamesIds } from './folderPrisma.js';
import prisma from '../database/prismaClient.js';
import { record } from 'zod';

const getPath = async (userId: string, parentId: string | null, folderId: string) => {
  if (parentId == null) {
    return `${userId}/${folderId}`;
  }

  const parentPath = await getParentPath(parentId);
  const path = `${parentPath}/${folderId}`;
  return path;
};

type Folder = {
  id: string;
  name: string;
  children?: Folder[];
};

const getFolderTree = async (userId: string) => {
  const allPaths = await getAllPaths(userId);
  const folderNamesAndIds = await getAllFolderNamesIds(userId);

  buildFolderTree(allPaths, folderNamesAndIds);

  function buildFolderTree(
    paths: { path?: string | null; name: string }[],
    meta: { id: string; name: string }[]
  ): Folder[] {
    const metaMap = new Map(meta.map((m) => [m.id, m.name]));
    const root: Folder[] = [];

    for (const { path } of paths) {
      if (!path) continue;
      const ids = path.split('/').slice(1); // skip the root
      let currentLevel = root;

      for (const id of ids) {
        if (!metaMap.has(id)) continue;

        // try to find existing folder
        let existing = currentLevel.find((f) => f.id === id);
        if (!existing) {
          existing = { id, name: metaMap.get(id)!, children: [] };
          currentLevel.push(existing);
        }

        // drill down
        currentLevel = existing.children!;
      }
    }
    console.log(JSON.stringify(root, null, 2));
    return root;
  }
};

export { getPath, getFolderTree };
