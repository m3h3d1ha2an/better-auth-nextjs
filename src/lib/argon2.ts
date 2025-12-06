// Better auth wont working if you don't create function any other way like using arrow function
// below are the minimal configuration of argon2 found in lucia auth documentation

import { hash, type Options, verify } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 19_456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  const result = await hash(password, opts);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const result = await verify(data.hash, data.password, opts);
  return result;
}
