import { useState } from "react";
import { useCookies } from "react-cookie";
import AvatarEditor from "react-avatar-editor";
import useUploadImage from "@/hooks/useUploadImage";
import style from "../styles/uploadImage.module.scss";

function UploadImage({ func }) {
  const [cookies] = useCookies(["user"]);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length > 0 && files[0].type.match("image.*")) {
      setImage(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const file = event.target.elements.image.files[0];
    console.log(file);
    const dataurl = handleSave();
    console.log(dataurl);
    const formData = new FormData();
    formData.append("picture", dataurl);

    useUploadImage(formData, cookies.token.access_token);
  };

  function handleEditorRef(ref) {
    setEditor(ref);
  }

  function handleSave() {
    const canvas = editor.getImage();
    // console.log(canvas);
    const dataUrl = canvas.toDataURL();
    // URL to file
    // 处理图像数据
    const blob = dataURItoBlob(dataUrl);

    return blob;
  }

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);

    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    // New Code
    return new Blob([ab], { type: mimeString });
  }

  return (
    <div className={style.bg}>
      <span>編輯頭像</span>
      <button type="button" onClick={() => func(false)}>
        <i className="fa fa-xmark absolute left-[87%] top-[6%]" />
      </button>
      <form
        onSubmit={handleFormSubmit}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <AvatarEditor
          ref={handleEditorRef}
          image={image}
          width={200}
          height={150}
          border={50}
          borderRadius={0}
          scale={1.3}
        />
        <div className="flex justify-center items-center gap-2">
          <label htmlFor="image" className={style.upload_confirm}>
            <input
              type="file"
              name="image"
              id="image"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setImage(event.target.files[0]);
                }
              }}
            />
            上傳圖片
          </label>
          <input type="submit" className={style.upload_confirm} value="確認" />
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
