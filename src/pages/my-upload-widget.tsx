import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import imageCompression from "browser-image-compression";

const upload = async (file: File) => {
  const formData = new FormData();

  const optimisedImageFile = await imageCompression(file, {
    maxWidthOrHeight: 1200,
    initialQuality: 0.9,
  });

  formData.append("file", optimisedImageFile);

  formData.append("upload_preset", "signed-test");

  const signRes = await fetch("/api/sign-cloudinary-params2");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sign = (await signRes.json()) as {
    signature: string;
    timestamp: number;
  };

  formData.append("signature", sign.signature);
  formData.append("api_key", "637726183115692");
  formData.append("timestamp", String(sign.timestamp));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${"dmez60vl2"}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  console.log("res:", res);
};

const uploadInputId = "image-upload-input-id";

const MyUploadWidget = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files?.length) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = files[0]!;
    const isImage = file.name.match(/.(jpg|jpeg|png|webp|avif|gif|tiff)$/i);

    if (!isImage) {
      return;
    }

    const isAcceptedImage = file.name.match(/.(jpg|jpeg|png|webp)$/i);

    if (!isAcceptedImage) {
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = async (file: File | null) => {
    if (!file) {
      return;
    }

    await upload(file);
  };

  return (
    <div>
      <input
        accept="image/png, image/jpg, image/jpeg, image/webp"
        onChange={handleImageInputFileChange}
        id={uploadInputId}
        name="files"
        type="file"
        autoComplete="off"
      />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button onClick={() => handleSubmit(imageFile)} type="button">
        Submit
      </button>
      {imageFile ? <ImageFileDisplay file={imageFile} /> : null}
    </div>
  );
};

export default MyUploadWidget;

const ImageFileDisplay = ({ file }: { file: File }) => {
  const imgSrc = URL.createObjectURL(file);

  return (
    <div className="flex gap-2">
      <div className="border-2">
        <Image
          width={150}
          height={150}
          layout="fixed"
          objectFit="contain"
          src={imgSrc}
          alt=""
          className="bg-gray-50"
        />
      </div>
      <div className={`flex flex-col justify-center`}>
        <h4 className={`text-sm font-medium`}>Image file:</h4>
        <p className={`text-sm text-gray-600`}>{file.name}</p>
      </div>
    </div>
  );
};
