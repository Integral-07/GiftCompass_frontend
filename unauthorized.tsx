// app/unauthorized.tsx
export default function UnauthorizedPage() {
    // ログインページへのリダイレクト
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return <p>Redirecting to login...</p>;
  }
  