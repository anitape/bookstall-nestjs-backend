import bcrypt from 'bcrypt';

export class CryptoService {
    //Compares a plain-text password with a hashed password
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    // //Generates a bcrypt hash from a plain-text password
    // generateHash(password: string): Promise<string> {
    //     return bcrypt.hash(password, 10); // 10 is the number of salt rounds
    // }
}