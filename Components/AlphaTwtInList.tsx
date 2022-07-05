import Link from "next/link";

export const AlphaTwtInList = ({ alphaTwt }) => {
  return (
    <Link href={`/p/${alphaTwt.id}`} passHref>
      <div className="cursor-pointer bg-gray-100 rounded-lg mt-4 p-6">
        <h3>{alphaTwt.content}</h3>
        {/* <p>{alphaTwt.preview}</p> */}
      </div>
    </Link>
  );
};

export default AlphaTwtInList;
