const { sendErrorResponse } = require("../helpers/send_error_res");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const { JwtServicee } = require("../service/jwt.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    if (!user) {
      return sendErrorResponse(
        { message: "password or email incorrect" },
        res,
        400
      );
    }

    const verifyPassword = await bcrypt.compare(password, user.hashed_password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "password or email incorrect" },
        res,
        400
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = JwtServicee.generateToken(payload);

    const hashed_token = await bcrypt.hash(tokens.accessToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookies("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "User logged in", accessRoken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refresh token topilmadi" },
        res,
        400
      );
    }

    const decodedToken = await JwtServicee.verifyRefreshToken(refreshToken);

    const user = await User.update(
      { hashed_token: null },
      { where: { id: decodedToken.id }, returning: true }
    );

    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ user });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refresh token topilmadi" },
        res,
        400
      );
    }

    const decodedToken = await JwtServicee.verifyRefreshToken(refreshToken);

    const user = await User.findByPk(decodedToken.id, {
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      return res.status(400).send({ message: "Such token user not found" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = JwtServicee.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.accessToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });
    res
      .status(200)
      .send({ message: "User logged in", accessRoken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  login,
  logout,
  refresh,
};
