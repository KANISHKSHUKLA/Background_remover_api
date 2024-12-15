const { removeBackground } = require('../services/backgroundRemoval');
const { uploadToS3 } = require('../services/storage');
const logger = require('../utils/logger');

exports.processImage = async (req, res, next) => {
  try {
    const { image_url, bounding_box } = req.body;

    // Process image and remove background
    const processedImageBuffer = await removeBackground(image_url, bounding_box);

    // Upload processed image to S3
    const processedImageUrl = await uploadToS3(processedImageBuffer);

    res.json({
      original_image_url: image_url,
      processed_image_url: processedImageUrl
    });
  } catch (error) {
    logger.error('Error processing image:', error);
    next(error);
  }
};