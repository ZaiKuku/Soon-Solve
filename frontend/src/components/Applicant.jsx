import Image from "next/image";

function Applicant() {
  return (
    <div className="flex gap-2">
        <Image src="/images/1.jpg" width={50} height={50} className="rounded-full" />
    </div>
  );
}

export default Applicant;
