import Head from "next/head";
import { uid } from "uid";

import { api } from "~/utils/api";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const generateSignature = async (
  callback: (signature: string) => void,
  paramsToSign: string
) =>
  await fetch("/api/sign-cloudinary-params", {
    method: "post",
    body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      paramsToSign,
    }),
  })
    .then((r) => r.json())
    .then(({ signature }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callback(signature as string);
    });

const Images = () => {
  const [uploadImageId, setUploadImageId] = useState(uid());

  const createDbImage = api.image.create.useMutation();

  return (
    <>
      <Head>
        <title>cloudinary upload image</title>
      </Head>
      <main>
        <CldUploadWidget
          uploadPreset="signed-test"
          signatureEndpoint="/api/sign-cloudinary-params"
          options={{
            uploadSignature: generateSignature,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Unreachable code error
            sources: ["local"],
            multiple: false,
            publicId: uploadImageId,
          }}
          onUpload={() => {
            // what to do if upload works but create db image fails?
            createDbImage.mutate({ cloudinaryId: uploadImageId });
            setUploadImageId(uid());
          }}
        >
          {({ open }) => {
            function handleOnClick(e: React.MouseEvent<HTMLElement>) {
              e.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              open();
            }

            return <button onClick={handleOnClick}>Upload an Image</button>;
          }}
        </CldUploadWidget>
      </main>
    </>
  );
};

export default Images;
