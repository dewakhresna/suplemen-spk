import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import { encrypt } from "../utils/encryption.js";
import { renderMailHtml, sendMail } from "../utils/mail/mail.js";
import { CLIENT_HOST, EMAIL_SMTP_USER } from "../utils/env.js";
import { ROLES } from "../utils/constant.js";
import * as Yup from "yup";

const validatePassword = Yup.string()
  .required()
  .min(6, "Password must be at least 6 characters")
  .test("at-least-one-uppercase-letter", "Contains at least one uppercase letter", (value) => {
    if (!value) return false;
    return /^(?=.*[A-Z])/.test(value);
  })
  .test("at-least-one-number", "Contains at least one number", (value) => {
    if (!value) return false;
    return /^(?=.*\d)/.test(value);
  });

const validateConfirmPassword = Yup.string()
  .required()
  .oneOf([Yup.ref("password"), ""], "Password not match");

export const USER_MODEL_NAME = "User";

export const userLoginDTO = Yup.object({
  identifier: Yup.string().required(),
  password: validatePassword,
});

export const userUpdatePasswordDTO = Yup.object({
  oldPassword: validatePassword,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
});

export const userDTO = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
});

export type TypeUser = Yup.InferType<typeof userDTO>;

export interface UserAttributes extends Omit<TypeUser, "confirmPassword"> {
  id?: number;
  isActive?: boolean;
  activationCode?: string;
  role?: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class UserModel extends Model<UserAttributes> implements UserAttributes {
  public declare id: number;
  public declare fullName: string;
  public declare username: string;
  public declare email: string;
  public declare password: string;
  public declare role: string;
  public declare profilePicture: string;
  public declare isActive: boolean;
  public declare activationCode: string;
  public declare readonly createdAt: Date;

  public toJSON() {
    const { password, activationCode, ...values } = this.get();
    return values;
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: ROLES.USER,
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "user.jpg",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    activationCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password);
        user.activationCode = encrypt(user.email + Date.now().toString());
      },
      afterCreate: async (user) => {
        try {
          console.log("Send Email to: ", user.email);
          const contentMail = await renderMailHtml("registration-success.ejs", {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
            activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
          });
          await sendMail({
            from: EMAIL_SMTP_USER,
            to: user.email,
            subject: "Aktivasi Akun Anda",
            html: contentMail,
          });
        } catch (error) {
          console.error("Gagal mengirim email aktivasi:", error);
        }
      },
    },
  }
);

export default UserModel;