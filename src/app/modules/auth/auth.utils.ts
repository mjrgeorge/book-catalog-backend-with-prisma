import bcrypt from 'bcrypt';
import config from '../../../config';

export async function hashPasswordHook(password: string): Promise<string> {
  const saltRounds = Number(config.bycrypt_salt_rounds);
  return await bcrypt.hash(password, saltRounds);
}
