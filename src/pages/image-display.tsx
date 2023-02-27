import { CldImage } from "next-cloudinary";
import { useState } from "react";

const ImageDisplay = () => {
  return <MyImage cloudinaryId="test/4f35535d070" width={600} height={400} />;
};

export default ImageDisplay;

const MyImage = ({
  height,
  width,
  cloudinaryId,
}: {
  width: number;
  height: number;
  cloudinaryId: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`absolute h-full w-full transition-opacity duration-200 ease-out ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <CldImage
          src={cloudinaryId}
          width={width}
          height={height}
          effects={[{ blur: "1000" }]}
          quality={1}
          alt=""
        />
      </div>
      <CldImage
        src={cloudinaryId}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        alt=""
      />
    </div>
  );
};
