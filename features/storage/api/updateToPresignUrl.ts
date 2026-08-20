import { PresignUrl } from "../types";

export const uploadToPresignedUrl = async (
  presignData: PresignUrl,
  file: File,
): Promise<void> => {
  const formData = new FormData();

  Object.entries(presignData.formData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append("key", presignData.objectKey);
  formData.append("Content-Type", file.type);

  formData.append("file", file);

  const targetUrl = presignData.uploadUrl.replace(
    `/${presignData.objectKey}`,
    "",
  );

  const response = await fetch(targetUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `File upload failed (Status: ${response.status}). Details: ${errorText}`,
    );
  }
};
