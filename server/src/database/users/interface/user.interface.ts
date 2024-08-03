import IEmail from "./IEmail";
import IName from "./IName";
import IPassword from "./IPassword";
import IPhone from "./IPhone";
import IId from "./_IId";

interface IUser extends IName, IEmail, IPassword, IPhone, IId {}

export default IUser;
