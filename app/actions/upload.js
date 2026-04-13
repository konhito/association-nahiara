"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1" 
});

export async function getUploadPresignedUrl(filename, contentType) {
  try {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.warn("AWS Credentials missing. Cannot generate presigned URL.");
      return { 
        success: false, 
        error: "AWS configuration is missing on the server. Please add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to your .env.local file." 
      };
    }

    const safeFilename = filename.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
    const uniqueKey = `picture-artwork-drawing/${Date.now()}-${safeFilename}`;

    const command = new PutObjectCommand({
      Bucket: "aquamundi-glb-models",
      Key: uniqueKey,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    return { 
      success: true, 
      url, 
      key: uniqueKey 
    };
  } catch (error) {
    console.error("Presigner error:", error);
    return { success: false, error: error.message };
  }
}
