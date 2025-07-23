import { Navigation } from "@/components/navigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">About Page</h1>
      </div>
    </div>
  );
}