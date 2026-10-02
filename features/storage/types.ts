export interface PresignUrl {
  uploadUrl: string;
  formData: Record<string, string>;
  objectKey: string;
  expiresInSeconds: number;
}
