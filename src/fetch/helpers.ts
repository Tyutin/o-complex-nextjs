export function fetchBuilder({
  url,
  method,
  body,
  queryParams,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  queryParams?: Record<string, any>;
}): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (queryParams) {
    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            JSON.stringify(value)
          )}`
      )
      .join('&');
    url = `${url}?${queryString}`;
  }

  return fetch(url, {
    method,
    headers,
    body: !!body ? JSON.stringify(body) : null,
  });
}
