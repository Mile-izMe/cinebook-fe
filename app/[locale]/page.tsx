import MovieMain from "@/features/movie/components/MovieMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomePage | CINEBOOK",
  description: "HomePage with movies",
};

export default function Home() {
  return (
    <main className="flex-grow bg-brand-black pb-16">
      <MovieMain />
    </main>
  );
}
