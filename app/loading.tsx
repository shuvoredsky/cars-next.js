import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <Image
        src="/loading-car.png"
        alt="Loading..."
        width={120}
        height={120}
        className="animate-spin"
      />
      <p className="mt-4 text-gray-400">Loading...</p>
    </div>
  );
}
