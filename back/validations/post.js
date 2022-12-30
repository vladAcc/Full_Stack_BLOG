import { body } from 'express-validator';

export const postCreateValidator = [
    body('title', 'Vedite zagolovoc staatii').isLength({ min: 3}).isString(),
    body('text', 'vedite text statii').isLength({ min: 10}).isString(),
    body('tags', 'Ne vernii format tegov').optional().isString(),//nui obezatelini
    body('imageUrl', 'Ne vernaia silca').optional().isString() //nui obezatelini
];

