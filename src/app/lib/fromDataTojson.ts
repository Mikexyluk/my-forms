export function formDataToJson(formData: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: any = {};

  Array.from(formData.entries()).forEach(([key, value]) => {
    const match = key.match(/^(\w+)\[(\w+)\]$/);

    if (match) {
      const [, parentKey, childKey] = match;
      json[parentKey] = json[parentKey] || {};
      json[parentKey][childKey] = value;
    } else {
      json[key] = value;
    }
  });

  return json;
}
