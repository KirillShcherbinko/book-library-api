export const fetchJson = async <T>(url: string) => {
  const result = await fetch(`${process.env.EXTERNAL_API_URL}${url}`);
  if (!result.ok) {
    throw new Error(`External API error: ${result.status} ${result.statusText}`);
  }

  return (await result.json()) as T;
};
