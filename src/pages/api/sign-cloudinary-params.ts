/* eslint-disable @typescript-eslint/require-await */
import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary, type SignApiOptions } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const {body} = req
  const body = (JSON.parse(req.body as string) || {}) as {
    paramsToSign?: SignApiOptions;
  };
  const { paramsToSign } = body;

  console.log("HELLO");

  try {
    if (!paramsToSign) {
      throw new Error("no paramsToSign");
    }
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );
    res.status(200).json({
      signature,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
