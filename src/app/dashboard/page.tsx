import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isValidDemoEmail } from "@/lib/demo-accounts";

export default async function DashboardIndexPage() {
  const supabase = await createClient();
  let { data: { user } } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const demoEmail = cookieStore.get("demo_access")?.value;

  if (!user && String(process.env.NODE_ENV) !== 'production' && isValidDemoEmail(demoEmail)) {
    user = {
      email: demoEmail,
      user_metadata: { role: demoEmail === "admin@demodental.com" ? "admin" : "doctor" }
    } as any;
  }

  if (!user) {
    redirect("/login");
  }

  const role = user.user_metadata?.role || "doctor";
  
  if (role === "admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/doctor");
  }
}
