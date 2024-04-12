export function fetchBuilder(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: any
): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    method,
    headers,
    body: !!body ? JSON.stringify(body) : null,
  });
}
