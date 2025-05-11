import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white py-5 px-10 flex justify-between items-center">
      <h1 className="text-4xl font-bold text-green-600">PlantGuard AI</h1>
      <Link
        href="/login"
        className="text-white bg-green-500 px-6 py-3 rounded-full text-lg font-semibold"
      >
        Try Demo
      </Link>
    </header>
  );
}
