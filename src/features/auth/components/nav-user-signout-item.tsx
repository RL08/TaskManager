"use client";

import { LogOutIcon } from "lucide-react";
import { authClient } from "@/src/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";

export default function SignOutMenuItem() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  );
}
