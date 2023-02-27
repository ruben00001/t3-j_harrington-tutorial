/* eslint-disable @typescript-eslint/require-await */
import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset: "signed-test" },
      process.env.CLOUDINARY_API_SECRET as string
    );

    res.status(200).json({
      timestamp,
      signature,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
