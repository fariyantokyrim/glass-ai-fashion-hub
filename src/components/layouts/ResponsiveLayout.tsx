
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WebLayout } from "./WebLayout";
import { Navigation } from "../Navigation";

export const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
  return <WebLayout>{children}</WebLayout>;
};
