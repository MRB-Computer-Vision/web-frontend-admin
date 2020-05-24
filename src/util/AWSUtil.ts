import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_ACCESS_SECRET,
});

export async function sign(name: string, type: string): Promise<any> {
  const s3 = new aws.S3();

  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Key: name,
    Expires: 60,
    ContentType: type,
  };
  try {
    const data = await s3.getSignedUrl('putObject', params);
    return data;
  } catch (err) {
    return err;
  }
}
