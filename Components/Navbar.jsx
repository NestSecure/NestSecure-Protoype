import Link from 'next/link';
export default function Navbar() {
  return (
     <nav className="bg-blue-900 text-white p-4 flex justify-between">
       <h1 className="font-bold text-xl">NestSecure</h1>
       <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/audit" className="hover:underline">Audit</Link>
          <Link href="/training" className="hover:underline">Training</Link>
          <Link href="/toolkit" className="hover:underline">Toolkit</Link>
         </div>
       </nav>
    );
  }