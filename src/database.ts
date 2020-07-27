import { createHandyClient } from 'handy-redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const KEY = 'website-content';

const DEFAULT_HTML = '<p>Hello! Edit me to change content on the backend</p>';

export async function setContent(content: string): Promise<void> {
  const client = createHandyClient(REDIS_URL);
  await client.set(KEY, content);
  client.quit();
}

export async function getContent(): Promise<string> {
  const client = createHandyClient(REDIS_URL);
  let content = await client.get(KEY);

  // Set content in the database to the default if not set
  if (content === null || typeof content === 'undefined' || content.length === 0) {
    content = DEFAULT_HTML;
    await setContent(content);
  }

  client.quit();
  return content;
}
