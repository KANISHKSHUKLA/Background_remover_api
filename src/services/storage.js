const AWS = require('aws-sdk');
const logger = require('../utils/logger');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.uploadToS3 = async (imageBuffer) => {
  try {
    const timestamp = Date.now();
    const key = `processed-images/${timestamp}.png`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: imageBuffer,
      ContentType: 'image/png',
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    logger.error('Error uploading to S3:', error);
    throw new Error('Failed to upload processed image');
  }
};