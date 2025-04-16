export default function Title({ title, subTitle }) {
  return (
    <div className="text-white px-8 my-10 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
        {subTitle}
      </p>
    </div>
  );
}
