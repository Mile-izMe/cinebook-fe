import { Edit, Trash2 } from "lucide-react";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function GenericTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  onEdit,
  onDelete,
}: GenericTableProps<T>) {
  if (isLoading)
    return <div className="p-8 text-center text-gray-500">Loading data...</div>;
  if (!data || data.length === 0)
    return (
      <div className="p-8 text-center text-gray-500">No data available</div>
    );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow ring-1 ring-black ring-opacity-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                >
                  {col.cell
                    ? col.cell(item)
                    : (item[col.accessorKey as keyof T] as React.ReactNode)}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="cursor-pointer text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="cursor-pointer text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
