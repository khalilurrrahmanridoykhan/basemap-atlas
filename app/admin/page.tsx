import { isAdmin } from "@/lib/auth";
import { AdminPanel } from "@/components/AdminPanel";
export const dynamic="force-dynamic";
export default async function Admin(){return <AdminPanel initiallyAuthenticated={await isAdmin()}/>}
