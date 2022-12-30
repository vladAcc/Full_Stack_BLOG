
import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Nui drept formatul la email').isEmail(),
    body('password', 'password ii prea scurt').isLength({ min: 5}),
    body('fullName', 'fullName ii prea scurt').isLength({ min: 3}),
    body('avatarUrl', 'Nui dreapta ssilca').optional().isURL()//nui obezatelinii, de vazut daca e silca
];

export const loginValidator = [
    body('email', 'Nui drept formatul la email').isEmail(),
    body('password', 'password ii prea scurt').isLength({ min: 5})]
   

