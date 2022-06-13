import Link from "next/link";

export const AlphaTwtInList = ({ alphaTwt }) => {
  return (
    <Link href={`/p/${alphaTwt.id}`} passHref>
      <div>
        <h3>{alphaTwt.title}</h3>
        <p>{alphaTwt.preview}</p>
      </div>
    </Link>
  );
};

export default AlphaTwtInList;
