"use client";

import { ColumnDef, GenericTable } from "@/components";
import {
  CreateRoomInput,
  createRoomSchema,
  Room,
  ROOM_TYPES,
  useCinemas,
  useCreateRoom,
  useRoomsByCinemaId,
} from "@/features";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionModal } from "./ActionModal";

export default function RoomManagement() {
  const t = useTranslations("validation");

  const [selectedCinemaId, setSelectedCinemaId] = useState<string>("");

  const { data: cinemas } = useCinemas();
  const { data: rooms, isLoading: isLoadingRooms } =
    useRoomsByCinemaId(selectedCinemaId);

  const { mutateAsync: createRoom, isPending: isCreating } =
    useCreateRoom(selectedCinemaId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomSchema(t)),
    defaultValues: { name: "", capacity: 0, type: "STANDARD" },
  });

  const columns: ColumnDef<Room>[] = [
    { header: "Tên phòng", accessorKey: "name" },
    { header: "Sức chứa", accessorKey: "capacity" },
    { header: "Loại phòng", accessorKey: "roomType" },
    { header: "Trạng thái", accessorKey: "status" },
  ];

  const onSubmit = async (data: CreateRoomInput) => {
    try {
      await createRoom(data);
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAdd = () => {
    reset();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-md border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý Phòng Chiếu
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Vui lòng chọn Rạp để xem và thêm phòng chiếu
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={selectedCinemaId}
            onChange={(e) => setSelectedCinemaId(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-gray-900 outline-none focus:border-red-600 bg-white min-w-[250px]"
          >
            <option value="" disabled>
              -- Chọn Rạp Chiếu --
            </option>
            {cinemas?.data?.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name} - {cinema.cityName}
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenAdd}
            disabled={!selectedCinemaId}
            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap transition-colors"
          >
            Thêm Phòng
          </button>
        </div>
      </div>

      {selectedCinemaId ? (
        <GenericTable
          data={rooms?.data || []}
          columns={columns}
          isLoading={isLoadingRooms}
          onEdit={undefined}
          onDelete={undefined}
        />
      ) : (
        <div className="text-center py-12 bg-white border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">
            Chưa chọn rạp. Vui lòng chọn một rạp chiếu ở trên để tải danh sách
            phòng.
          </p>
        </div>
      )}

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thêm Phòng mới"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 1. Tên phòng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Phòng / Số Phòng <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              className={`w-full p-2 border text-gray-900 rounded-md outline-none ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-red-600"
              }`}
              placeholder="VD: Cinema 01, Phòng IMAX..."
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 2. Loại phòng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại phòng <span className="text-red-500">*</span>
              </label>
              <select
                {...register("type")}
                className={`w-full p-2 border text-gray-900 rounded-md outline-none bg-white ${
                  errors.type
                    ? "border-red-500"
                    : "border-gray-300 focus:border-red-600"
                }`}
              >
                {ROOM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.type.message as string}
                </p>
              )}
            </div>

            {/* 3. Sức chứa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sức chứa (Ghế) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("capacity", { valueAsNumber: true })} // Ép kiểu string sang number
                className={`w-full p-2 border text-gray-900 rounded-md outline-none ${
                  errors.capacity
                    ? "border-red-500"
                    : "border-gray-300 focus:border-red-600"
                }`}
                placeholder="VD: 120"
              />
              {errors.capacity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.capacity.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 min-w-[100px]"
            >
              {isCreating ? "Đang tạo..." : "Tạo mới"}
            </button>
          </div>
        </form>
      </ActionModal>
    </div>
  );
}
