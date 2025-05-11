"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Hook-based logout utility for components
export function useLogout() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.set("authUpdatedAt", Date.now().toString());
    window.dispatchEvent(new Event("authChanged")); // ✅ TRIGGER REFRESH
    router.push("/");
  };

  return logout;
}
