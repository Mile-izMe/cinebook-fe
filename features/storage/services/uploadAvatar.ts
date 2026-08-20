import { uploadToPresignedUrl } from "../api/updateToPresignUrl";
import { PresignUrl } from "../types";
import { PresignUrlInput } from "../validations";

type GetPresignUrl = (data: PresignUrlInput) => Promise<{
  data: PresignUrl;
}>;

export const uploadAvatar = async (
  file: File,
  getPresignUrl: GetPresignUrl,
): Promise<string> => {
  const presignResult = await getPresignUrl({
    fileName: file.name,
    contentType: file.type,
    type: "AVATAR",
  });

  await uploadToPresignedUrl(presignResult.data, file);

  return presignResult.data.objectKey;
};
