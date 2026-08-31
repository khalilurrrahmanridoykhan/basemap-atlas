import { NextResponse } from "next/server";
import { createSession, sessionCookie } from "@/lib/auth";

export async function POST(request:Request){
  const {password}=await request.json();
  if(!process.env.ADMIN_PASSWORD) return NextResponse.json({error:"ADMIN_PASSWORD is not configured"},{status:503});
  if(password!==process.env.ADMIN_PASSWORD) return NextResponse.json({error:"Incorrect password"},{status:401});
  const response=NextResponse.json({ok:true});
  response.cookies.set(sessionCookie,createSession(),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*12});
  return response;
}
