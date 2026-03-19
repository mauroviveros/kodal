import lodash from "lodash";

export const formDataToObject = <T>(formData: FormData): T => {
  const obj: any = {};

  for (const [key, value] of formData.entries()) {
    if (value === "") continue;
    lodash.set(obj, key, value);
  }

  return obj as T;
}
