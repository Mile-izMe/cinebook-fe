"use client";

import { ColumnDef, GenericTable } from "@/components";
import {
  Cinema,
  CreateCinemaInput,
  createCinemaSchema,
  useCinemas,
  useCities,
  useCreateCinema,
  useDeleteCinema,
  useUpdateCinema,
} from "@/features";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActionModal } from "./ActionModal";

export default function CinemaManagement() {
  const t = useTranslations("validation");

  const [filterCityId, setFilterCityId] = useState<string>("");
  const { data: cinemas, isLoading } = useCinemas(filterCityId || undefined);
  const { data: cities } = useCities();

  const { mutateAsync: createCinema, isPending: isCreating } =
    useCreateCinema();
  const { mutateAsync: updateCinema, isPending: isUpdating } =
    useUpdateCinema();
  const { mutateAsync: deleteCinema, isPending: isDeleting } =
    useDeleteCinema();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cinemaToDelete, setCinemaToDelete] = useState<Cinema | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCinemaInput>({
    resolver: zodResolver(createCinemaSchema(t)),
    defaultValues: {
      name: "",
      address: "",
      cityId: "",
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    if (selectedCinema) {
      reset({
        name: selectedCinema.name,
        address: selectedCinema.address,
        latitude: selectedCinema.latitude,
        longitude: selectedCinema.longitude,
        cityId: selectedCinema.cityId,
      });
    } else {
      reset({ name: "", address: "", latitude: 0, longitude: 0, cityId: "" });
    }
  }, [selectedCinema, reset]);

  const columns: ColumnDef<Cinema>[] = [
    { header: "Cinema name", accessorKey: "name" },
    { header: "Address", accessorKey: "address" },
    { header: "City", accessorKey: "cityName" },
  ];

  const onSubmit = async (data: CreateCinemaInput) => {
    try {
      if (selectedCinema) {
        await updateCinema({ id: selectedCinema.id, ...data });
      } else {
        await createCinema(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCinema(null);
  };

  const handleOpenAdd = () => {
    setSelectedCinema(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (cinema: Cinema) => {
    setCinemaToDelete(cinema);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!cinemaToDelete) return;
    try {
      await deleteCinema(cinemaToDelete.id);
      setIsDeleteModalOpen(false);
      setCinemaToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER & FILTER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Rạp Phim</h1>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={filterCityId}
            onChange={(e) => setFilterCityId(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-gray-900 outline-none focus:border-red-600 bg-white min-w-[200px]"
          >
            <option value="">-- All cities --</option>
            {cities?.data?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.cityName}
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenAdd}
            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap"
          >
            Add Cinema
          </button>
        </div>
      </div>

      <GenericTable
        data={cinemas?.data || []}
        columns={columns}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* MODAL THÊM / SỬA */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedCinema ? "Cập nhật Rạp" : "Thêm Rạp mới"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 1. Tên Rạp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Rạp <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              className={`w-full p-2 border text-gray-900 rounded-md outline-none ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-red-600"
              }`}
              placeholder="VD: CGV Vincom..."
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 2. Dropdown Chọn Thành Phố */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thuộc Thành phố <span className="text-red-500">*</span>
            </label>
            <select
              {...register("cityId")}
              className={`w-full p-2 border text-gray-900 rounded-md outline-none bg-white ${
                errors.cityId
                  ? "border-red-500"
                  : "border-gray-300 focus:border-red-600"
              }`}
            >
              <option value="">-- Chọn thành phố --</option>
              {cities?.data?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cityId.message}
              </p>
            )}
          </div>

          {/* 3. Địa chỉ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ chi tiết <span className="text-red-500">*</span>
            </label>
            <input
              {...register("address")}
              className={`w-full p-2 border text-gray-900 rounded-md outline-none ${
                errors.address
                  ? "border-red-500"
                  : "border-gray-300 focus:border-red-600"
              }`}
              placeholder="VD: Tầng 5, Vincom Center..."
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vĩ độ (Latitude)
              </label>
              <input
                type="number"
                step="any"
                {...register("latitude", { valueAsNumber: true })}
                className="w-full p-2 border border-gray-300 text-gray-900 rounded-md outline-none focus:border-red-600"
              />
              {errors.latitude && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.latitude.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kinh độ (Longitude)
              </label>
              <input
                type="number"
                step="any"
                {...register("longitude", { valueAsNumber: true })}
                className="w-full p-2 border border-gray-300 text-gray-900 rounded-md outline-none focus:border-red-600"
              />
              {errors.longitude && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
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
              {selectedCinema ? "Lưu thay đổi" : "Tạo mới"}
            </button>
          </div>
        </form>
      </ActionModal>

      {/* MODAL XÓA (Giữ nguyên logic của bạn) */}
      <ActionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác nhận xóa"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Bạn có chắc chắn muốn xóa rạp{" "}
            <strong className="text-gray-900">{cinemaToDelete?.name}</strong>{" "}
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
