import z from 'zod';

const folderSchema = z.object({
  name: z.string(),
  type: z.enum(['FILE', 'FOLDER']),
  userId: z.string(),
});

export default { folderSchema };
