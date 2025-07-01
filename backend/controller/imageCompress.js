const image_compress = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "image uploaded",
  });
};

export default image_compress;
