import { Avatar } from "@material-tailwind/react";

export default function Message({ content, self = true, picture, name }) {
  return (
    <div className="w-full">
      {!self ? (
        <div className="flex align-top w-full">
          <Avatar src={picture} />
          <p className="bg-white rounded-xl p-2 ml-2 break-words whitespace-pre-wrap max-w-[60%]">
            {content}沒有訊息
          </p>
        </div>
      ) : (
        <div className="flex align-top w-full justify-end">
          <p className="bg-[#B15E6C] rounded-xl p-2 mr-2 break-words whitespace-pre-wrap max-w-[60%] ">
            {content}
          </p>
          <Avatar src={picture} />
        </div>
      )}
    </div>
  );
}
