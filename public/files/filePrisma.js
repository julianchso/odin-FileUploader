import prisma from '../database/prismaClient.js';
const createNewFile = async (name, mimetype, userId, parentFolderId, size) => {
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
export { createNewFile };
