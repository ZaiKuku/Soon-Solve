import { Avatar } from "@material-tailwind/react";

export default function Message({ content, self = true }) {
  return (
    <div className="w-full">
      {!self ? (
        <div className="flex align-top w-full">
          <Avatar src="/山道猴子.png" />
          <p className="bg-white rounded-xl p-2 ml-2 break-words whitespace-pre-wrap max-w-[60%]">
            {content}
          </p>
        </div>
      ) : (
        <div className="flex align-top w-full justify-end">
          <p className="bg-[#B15E6C] rounded-xl p-2 mr-2 break-words whitespace-pre-wrap max-w-[60%] ">
            {content}測試測試測試測試測試測試測試測試測試測試測試
          </p>
          <Avatar src="/山道猴子.png" />
        </div>
      )}
    </div>
  );
}
