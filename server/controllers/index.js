const User = require("../models/User");

exports.getAllData = (req, res, next) => {
  User.findAll()
    .then((Users) => {
      res.status(200).json({ Users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    });
};

exports.createData = (req, res, next) => {
  const { name, email, phone } = req.body;
  User.create({
    name: name,
    email: email,
    phone: phone,
  })
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Data Inserted Successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    });
};

exports.updateByid = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide an Id to Update!",
    });
  }
  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "All the fields are Mandatory!",
    });
  }
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    user.name = name;
    user.email = email;
    user.phone = phone;

    await user.save();
    res.status(200).json({ success: true, message: "Updation Successful!" });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.deleteByid = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide an Id to Delete!",
    });
  }
  try {
    const data = await User.findByPk(id);
    if (!data) {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Data not found!",
        });
      }
    }
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, message: "Deletion Successful!" });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
