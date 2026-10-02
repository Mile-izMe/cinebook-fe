import { PresignUrl } from "../types";

export const uploadToPresignedUrl = async (
  presignData: PresignUrl,
  file: File,
): Promise<void> => {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Only JPEG, PNG and WebP images are allowed");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must not exceed 5 MB");
  }
  const formData = new FormData();
  Object.entries(presignData.formData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const isCloudinary = Boolean(presignData.formData.public_id);
  if (!isCloudinary) {
    // Preserve the existing MinIO presigned POST fields and bucket URL.
    formData.set("key", presignData.objectKey);
    formData.set("Content-Type", file.type);
  }
  formData.append("file", file);
  const targetUrl = isCloudinary
    ? presignData.uploadUrl
    : presignData.uploadUrl.replace(`/${presignData.objectKey}`, "");
  const response = await fetch(targetUrl, { method: "POST", body: formData });
  if (!response.ok) {
    throw new Error(`File upload failed (Status: ${response.status})`);
  }
  if (isCloudinary) {
    const result = await response.json();
    if (result.public_id !== presignData.objectKey || result.resource_type !== "image") {
      throw new Error("Uploaded image does not match the requested asset");
    }
  }
};
