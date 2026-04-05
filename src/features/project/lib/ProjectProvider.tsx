"use client";

import { useState } from "react";
import { makeStore, AppStore } from "@/src/stores/store";
import { Provider } from "react-redux";

export default function ProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
