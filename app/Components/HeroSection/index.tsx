export default function index() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/Videos/NetflixLogo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
