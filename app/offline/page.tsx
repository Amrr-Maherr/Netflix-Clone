import { Button } from "@/components/ui/button";

export default function Offline() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
      <p className="text-lg mb-8">
        It looks like you're not connected to the internet. Please check your connection and try again.
      </p>
      <Button
        onClick={() => window.location.reload()}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-medium"
      >
        Retry
      </Button>
    </div>
  );
}
