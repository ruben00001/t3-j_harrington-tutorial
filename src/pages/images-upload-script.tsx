// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

import { CldUploadWidget } from "next-cloudiary";

const generateSignature = async (callback, paramsToSign) =>
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
      callback(signature);
    });

const Images = () => {
  const [scriptStatus, setScriptStatus] = useState<
    "uninitialised" | "loading" | "ready"
  >("uninitialised");
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);

  useEffect(() => {
    if (scriptStatus === "ready") {
      if (!cloudinary) {
        return;
      }
      console.log("cloudinary:", cloudinary);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const cloudinaryWidget = cloudinary.createUploadWidget(
        {
          cloudName: "dmez60vl2",
          uploadPreset: "signed-test",
          sources: ["local"],
          uploadSignature: generateSignature,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
        (error, result) => {
          console.log("error:", error);
          console.log("result:", result);
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCloudinaryWidget(cloudinaryWidget);
    }
  }, [scriptStatus]);

  return (
    <>
      <Head>
        <title>cloudinary upload image</title>
      </Head>
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        onLoad={() => setScriptStatus("loading")}
        onReady={() => setScriptStatus("ready")}
      ></Script>
      <main>
        {/*  eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call*/}
        <button onClick={() => cloudinaryWidget.open()}>Upload Image</button>
        {/*       <Image
        src="https://res.cloudinary.com/dmez60vl2/image/upload/w_445,q_auto:best,f_auto/v1580358882/zwhs68vfa7cjrvdqueec.jpg"
        alt=""
        width={600}
        height={400}
      />
      <CldImage src="zwhs68vfa7cjrvdqueec" alt="" width={600} height={400} /> */}
        <CldUploadWidget
          uploadPreset="signed-test"
          signatureEndpoint="/api/sign-cloudinary-params"
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
