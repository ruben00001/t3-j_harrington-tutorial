// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// import { CldUploadWidget } from "next-cloudiary";

const Images = () => {
  const [scriptStatus, setScriptStatus] = useState<
    "uninitialised" | "loading" | "ready"
  >("uninitialised");
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);

  useEffect(() => {
    console.log("scriptStatus:", scriptStatus);
    if (scriptStatus === "ready") {
      if (!cloudinary) {
        return;
      }
      console.log("cloudinary:", cloudinary);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const cloudinaryWidget = cloudinary.createUploadWidget(
        {
          cloudName: "dmez60vl2",
          uploadPreset: "unsigned-test",
          sources: ["local"],
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
        {/* <CldUploadWidget
        uploadPreset="unsigned-test"
      >
        {({ open }) => {
          function handleOnClick(e: React.MouseEvent<HTMLElement>) {
            e.preventDefault();
            open();
          }

          return <button onClick={handleOnClick}>Upload an Image</button>;
        }}
      </CldUploadWidget> */}
      </main>
    </>
  );
};

export default Images;
