export async function clientFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // 클라이언트는 쿠키가 자동으로 포함됨 (기본값)
  });

  if (!res.ok) {
    // 공통 에러 핸들러 호출
    const errorData = await res.json();
    throw new Error(errorData.message || 'Fetching error occured');
  }
  return res.json();
}
