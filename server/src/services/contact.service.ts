import { db } from '../db';
import { contacts } from '../db/schema';

export type CreateContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function createContact(data: CreateContactInput) {
  const id = crypto.randomUUID();
  await db.insert(contacts).values({ id, ...data });
}
