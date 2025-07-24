import { Header } from "@/components/header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="min-h-screen flex items-center justify-center pt-20">
        <h1 className="text-4xl font-bold">About Page</h1>
      </div>
    </div>
  );
}