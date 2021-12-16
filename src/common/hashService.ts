import * as bcrypt from 'bcryptjs';

export async function comparePass(password, hash) {
  return bcrypt.compare(password, hash);
}
