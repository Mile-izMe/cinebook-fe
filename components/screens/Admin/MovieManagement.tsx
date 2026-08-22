"use client";

import { ColumnDef, GenericTable } from "@/components";
import {
  MovieSummaryResponse,
  MovieDetailResponse,
  CreateMovieInput,
  createMovieSchema,
  useMovies,
  useGenres,
  useCreateMovie,
  useUpdateMovie,
  useDeleteMovie,
  GenreResponse,
} from "@/features";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ActionModal } from "./ActionModal";

export default function MovieManagement() {
  const t = useTranslations("validation");

  // Fetch data
  const { data: movies, isLoading, hasNextPage, fetchNextPage } = useMovies();
  const { data: genres } = useGenres();
  const flatMovies = movies?.pages.flatMap((page) => page.data) || [];

  // Mutations
  const { mutateAsync: createMovie, isPending: isCreating } = useCreateMovie();
  const { mutateAsync: updateMovie, isPending: isUpdating } = useUpdateMovie();
  const { mutateAsync: deleteMovie, isPending: isDeleting } = useDeleteMovie();

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<
    MovieDetailResponse | MovieSummaryResponse | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] =
    useState<MovieSummaryResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateMovieInput>({
    resolver: zodResolver(createMovieSchema(t)),
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
      ageRating: "",
      releaseDate: "",
      director: "",
      cast: [],
      genreIds: [],
      trailerUrl: "",
    },
  });

  useEffect(() => {
    if (selectedMovie) {
      const movie = selectedMovie as MovieDetailResponse;
      reset({
        title: movie.title,
        description: movie.description,
        duration: movie.duration,
        ageRating: movie.ageRating,
        releaseDate: movie.releaseDate,
        director: movie.director,
        cast: movie.cast || [],
        genreIds: movie.genres?.map((g) => g.id) || [],
        trailerUrl: movie.trailerUrl || "",
      });
    } else {
      reset({
        title: "",
        description: "",
        duration: 0,
        ageRating: "",
        releaseDate: "",
        director: "",
        cast: [],
        genreIds: [],
        trailerUrl: "",
      });
    }
  }, [selectedMovie, reset]);

  const columns: ColumnDef<MovieSummaryResponse>[] = [
    { header: "Tên Phim", accessorKey: "title" },
    {
      header: "Thời lượng",
      accessorKey: "duration",
      cell: (row) => `${row.duration} phút`,
    },
    { header: "Độ tuổi", accessorKey: "ageRating" },
    { header: "Điểm", accessorKey: "score", cell: (row) => `${row.score} ⭐` },
  ];

  const onSubmit = async (data: CreateMovieInput) => {
    try {
      if (selectedMovie) {
        await updateMovie({ id: selectedMovie.id, ...data });
      } else {
        await createMovie(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleOpenAdd = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (movie: MovieSummaryResponse) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (movie: MovieSummaryResponse) => {
    setMovieToDelete(movie);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!movieToDelete) return;
    try {
      await deleteMovie(movieToDelete.id);
      setIsDeleteModalOpen(false);
      setMovieToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER & FILTER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý Phim (Movies)
        </h1>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleOpenAdd}
            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap"
          >
            Thêm Phim Mới
          </button>
        </div>
      </div>

      <GenericTable
        data={flatMovies}
        columns={columns}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Tải thêm phim
          </button>
        </div>
      )}

      {/* MODAL THÊM / SỬA */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedMovie ? "Cập nhật Phim" : "Thêm Phim mới"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[70vh] overflow-y-auto px-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tên Phim */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên Phim <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title")}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none ${errors.title ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
                placeholder="VD: Spider-Man: No Way Home"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Mô tả */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none ${errors.description ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Thời lượng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời lượng (Phút) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("duration", { valueAsNumber: true })}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none ${errors.duration ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
              />
              {errors.duration && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Ngày khởi chiếu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày khởi chiếu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("releaseDate")}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none ${errors.releaseDate ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
              />
              {errors.releaseDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.releaseDate.message}
                </p>
              )}
            </div>

            {/* Giới hạn độ tuổi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới hạn độ tuổi <span className="text-red-500">*</span>
              </label>
              <select
                {...register("ageRating")}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none bg-white ${errors.ageRating ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
              >
                <option value="">-- Chọn phân loại --</option>
                <option value="P">P (Phổ biến)</option>
                <option value="K">K (Dưới 13t xem cùng cha mẹ)</option>
                <option value="T13">T13 (Từ 13 tuổi)</option>
                <option value="T16">T16 (Từ 16 tuổi)</option>
                <option value="T18">T18 (Từ 18 tuổi)</option>
              </select>
              {errors.ageRating && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.ageRating.message}
                </p>
              )}
            </div>

            {/* Đạo diễn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đạo diễn <span className="text-red-500">*</span>
              </label>
              <input
                {...register("director")}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none ${errors.director ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
              />
              {errors.director && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.director.message}
                </p>
              )}
            </div>

            {/* Diễn viên (Chuyển đổi chuỗi thành mảng) */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diễn viên (Cách nhau bằng dấu phẩy){" "}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="cast"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    value={
                      Array.isArray(field.value)
                        ? field.value.join(", ")
                        : field.value
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(
                        val
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      );
                    }}
                    className={`w-full p-2 border text-gray-900 rounded-md outline-none ${errors.cast ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
                    placeholder="VD: Tom Holland, Zendaya, ..."
                  />
                )}
              />
              {errors.cast && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cast.message}
                </p>
              )}
            </div>

            {/* Trailer URL */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trailer URL (YouTube)
              </label>
              <input
                {...register("trailerUrl")}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none ${errors.trailerUrl ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
                placeholder="https://youtube.com/..."
              />
              {errors.trailerUrl && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.trailerUrl.message}
                </p>
              )}
            </div>

            {/* Thể loại (Genre) */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thể loại <span className="text-red-500">*</span>
              </label>
              <select
                multiple
                {...register("genreIds")}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none bg-white min-h-25 ${errors.genreIds ? "border-red-500" : "border-gray-300 focus:border-red-600"}`}
              >
                {genres?.data?.map((g: GenreResponse) => (
                  <option
                    key={g.id}
                    value={g.id}
                    className="p-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {g.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Nhấn giữ Ctrl (hoặc Cmd) để chọn nhiều thể loại.
              </p>
              {errors.genreIds && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.genreIds.message}m
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {selectedMovie ? "Lưu thay đổi" : "Tạo mới"}
            </button>
          </div>
        </form>
      </ActionModal>

      {/* MODAL XÓA */}
      <ActionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác nhận xóa"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Bạn có chắc chắn muốn xóa phim{" "}
            <strong className="text-gray-900">{movieToDelete?.title}</strong>{" "}
            không? Hành động này không thể hoàn tác.
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </div>
      </ActionModal>
    </div>
  );
}
