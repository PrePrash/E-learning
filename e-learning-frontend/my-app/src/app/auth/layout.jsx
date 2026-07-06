export const metadata = {
  title: "Auth | E-Learning",
  description: "Login and Register to E-Learning Platform",
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg" style={{textAlign: 'center'}}>
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6" style={{textAlign: 'center'}}>
          E-Learning Platform
        </h1>
        {children}
      </div>
    </div>
  );
}
