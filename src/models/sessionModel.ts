/** SQLite database interactions with sessions*/
import db from '../config/db';
import { Statement } from 'sqlite3';
const crypto = require('crypto');


const insert_session: Statement = db.prepare(`
    INSERT INTO sessions (id, buyer_id, expires_at)
    VALUES (
      $id,
      $buyer_id,
      DATE('now', '+7 days')
    )
  `);  

export function createSession(buyer_id: number): string {
    const id: string = crypto.randomBytes(64).toString('hex');
    insert_session.run({ id, buyer_id});
    return id;
}

const select_session: Statement = db.prepare(`
    SELECT id, buyer_id, expires_at
    FROM sessions
    WHERE id = ?
  `);

export function getSession(sid: string): Promise<{ id: string; buyer_id: number; expires_at: string } | undefined> {
    return new Promise((resolve, reject) => {
      select_session.get(sid, (err: Error | null, session: { id: string; buyer_id: number; expires_at: string }) => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    });
  }

const delete_session: Statement = db.prepare(`
    DELERE FROM sessions WHERE id = ?
    `);

export function removeSession(sid: string): void {
    delete_session.run(sid);
}

