"use client";
import { useMe } from "..";

export function AuthInitializer() {
  useMe(); // chỉ chạy side-effect populate store, không render gì
  return null;
}
