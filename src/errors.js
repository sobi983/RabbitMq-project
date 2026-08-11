export class PermanentError extends Error {
 constructor(message) {
   super(message);
   this.name = 'PermanentError';
 }
}

export function log(level, msg) {
 const ts = new Date().toISOString();
 console.log(`${ts} [${level.toUpperCase()}] ${msg}`);
}
