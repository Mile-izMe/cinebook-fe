"use client";

import { ColumnDef, GenericTable } from "@/components";
import {
  CityResponse,
  CreateCityInput,
  createCitySchema,
  useCities,
  useCreateCity,
  useUpdateCity,
  useDeleteCity,
} from "@/features";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActionModal } from "./ActionModal";

export default function CityManagement() {
  const t = useTranslations("validation");
  const { data: cities, isLoading } = useCities();
  const { mutateAsync: createCity, isPending: isCreating } = useCreateCity();
  const { mutateAsync: updateCity, isPending: isUpdating } = useUpdateCity();
  const { mutateAsync: deleteCity, isPending: isDeleting } = useDeleteCity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityResponse | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<CityResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCityInput>({
    resolver: zodResolver(createCitySchema(t)),
    defaultValues: { cityName: "" },
  });

  useEffect(() => {
    if (selectedCity) {
      reset({ cityName: selectedCity.cityName });
    } else {
      reset({ cityName: "" });
    }
  }, [selectedCity, reset]);

  const columns: ColumnDef<CityResponse>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "City name", accessorKey: "cityName" },
  ];

  const onSubmit = async (data: CreateCityInput) => {
    try {
      if (selectedCity) {
        await updateCity({ id: selectedCity.id, cityName: data.cityName });
      } else {
        await createCity({ cityName: data.cityName });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

  const handleOpenAdd = () => {
    setSelectedCity(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (city: CityResponse) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (city: CityResponse) => {
    setCityToDelete(city);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!cityToDelete) return;
    try {
      await deleteCity(cityToDelete.id);
      setIsDeleteModalOpen(false);
      setCityToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">City Management</h1>
        <button
          onClick={handleOpenAdd}
          className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      <GenericTable
        data={cities?.data || []}
        columns={columns}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <ActionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedCity ? "Edit city" : "Create city"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên thành phố <span className="text-red-500">*</span>
            </label>
            <input
              {...register("cityName")}
              className={`w-full p-2 border text-gray-900 rounded-md outline-none ${
                errors.cityName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-brand-red"
              }`}
              placeholder="VD: Hồ Chí Minh, Hà Nội..."
            />
            {errors.cityName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cityName.message}
              </p>
            )}
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
              {selectedCity ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </ActionModal>

      <ActionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác nhận xóa"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Bạn có chắc chắn muốn xóa{" "}
            <strong className="text-gray-900">{cityToDelete?.cityName}</strong>{" "}
            không? Hành động này không thể hoàn tác.
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center min-w-[80px]"
            >
              {isDeleting ? "..." : "Xóa"}
            </button>
          </div>
        </div>
      </ActionModal>
    </div>
  );
}
