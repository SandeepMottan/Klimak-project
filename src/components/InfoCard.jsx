
function InfoCard({ data, genreMap }) {
  return (
    <>
      <img
        className="object-fit"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
      />
      <div className="flex text-white flex-col bg-zinc-700 h-[400px] p-2 rounded-md justify-start  ">
        <p className=" pt-2 text-xl font-bold">{data.title}</p>
        <p className=" py-2">{data.release_date?.split("-")[0]}</p>
        <p className="">{data.overview}</p>
      </div>
    </>
  );
}

export default InfoCard;
