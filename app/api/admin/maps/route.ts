import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { databaseConfigured, deleteBasemap, getBasemaps, saveBasemap } from "@/lib/db";
import { Basemap } from "@/lib/data";

export async function GET(){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});return NextResponse.json({maps:await getBasemaps(),databaseConfigured:databaseConfigured()});}
export async function POST(request:Request){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});try{const map=await request.json() as Basemap;await saveBasemap(map);return NextResponse.json({ok:true});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to save"},{status:500});}}
export async function DELETE(request:Request){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});try{const {slug}=await request.json();await deleteBasemap(slug);return NextResponse.json({ok:true});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Unable to delete"},{status:500});}}
