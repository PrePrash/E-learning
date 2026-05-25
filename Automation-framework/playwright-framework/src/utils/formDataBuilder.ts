export const buildFormData = (
  payload: Record<string, string>
): URLSearchParams => {
  const formData = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};