export interface PresignUrl {
  uploadUrl: string;
  formData: Map<string, string>;
  objectKey: string;
  expiresInSeconds: number;
}
