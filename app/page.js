import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <div className="flex flex-col items-center justify-evenly">
        <h1 className="text-5xl p-4">Where Should I Eat?</h1>
        <h2 className="text-2xl">Feeling hungry?</h2>
      </div>
      <div className="flex p-2 space-x-4">
        <Link className="text-blue-500 rounded p-2" href="/buy">
          Continue to help choose a restaurant
        </Link>
      </div>
    </main>
  );
}
