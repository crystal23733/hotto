import IEmail from "./IEmail";
import IName from "./IName";
import IPassword from "./IPassword";
import IId from "./_IId";

interface IUser extends IName, IEmail, IPassword, IId {}

export default IUser;
