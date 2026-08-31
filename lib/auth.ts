import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "mapstack_admin";
function secret(){ return process.env.SESSION_SECRET || ""; }
function sign(value:string){ return createHmac("sha256",secret()).update(value).digest("hex"); }
export function createSession(){ const expires=String(Date.now()+1000*60*60*12); return `${expires}.${sign(expires)}`; }
export function verifySession(token?:string){
  if(!token || !process.env.SESSION_SECRET || !process.env.ADMIN_PASSWORD) return false; const [expires,signature]=token.split("."); if(!expires||!signature||Number(expires)<Date.now()) return false;
  const expected=Buffer.from(sign(expires)); const actual=Buffer.from(signature); return expected.length===actual.length&&timingSafeEqual(expected,actual);
}
export async function isAdmin(){ return verifySession((await cookies()).get(COOKIE)?.value); }
export const sessionCookie = COOKIE;
