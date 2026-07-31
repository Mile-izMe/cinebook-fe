import MovieDetail from "@/features/movie/components/detail/MovieDetail";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  // console.log(id);

  return (
    <main>
      <MovieDetail id={id} />
    </main>
  );
}
