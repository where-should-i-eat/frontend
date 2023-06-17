import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl">Flip Flop</h1>
      <div className="flex p-2 space-x-4">
        <Link className="rounded p-2 bg-purple-300" href="/buy">
          Buy
        </Link>
        <Link className="rounded p-2 bg-purple-300" href="/sell">
          Sell
        </Link>
      </div>
    </main>
  );
}
