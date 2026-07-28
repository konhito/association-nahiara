import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucket = process.env.ATLAS_S3_BUCKET || "aquamundi-glb-models";
const client = new S3Client({ region: process.env.AWS_REGION || "ap-south-1" });

export const hasAtlasStorage = () => Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);

export async function readAtlasSnapshot() {
  const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: "pollinator-atlas/fire/latest.json" }));
  return JSON.parse(await response.Body.transformToString());
}

export async function writeAtlasSnapshot(snapshot) {
  const body = JSON.stringify(snapshot);
  await Promise.all([
    client.send(new PutObjectCommand({ Bucket: bucket, Key: `pollinator-atlas/fire/${snapshot.updatedAt}.json`, Body: body, ContentType: "application/json" })),
    client.send(new PutObjectCommand({ Bucket: bucket, Key: "pollinator-atlas/fire/latest.json", Body: body, ContentType: "application/json", CacheControl: "max-age=300" })),
  ]);
}
