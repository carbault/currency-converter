export async function responseOrError(response: Response) {
  if (response.ok) {
    return response;
  }
  const errorInfo = await response.text();
  throw new Error(errorInfo);
}
