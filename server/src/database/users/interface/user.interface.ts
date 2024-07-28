import { Document } from "mongoose";
import IEmail from "./IEmail";
import IName from "./IName";
import IPassword from "./IPassword";
import IPhone from "./IPhone";

interface IUser extends IName, IEmail, IPassword, IPhone, Document {}

export default IUser;
