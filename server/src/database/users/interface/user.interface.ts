import IEmail from "./email";
import IName from "./name";
import IPassword from "./password";
import IPhone from "./phone";

interface IUser extends IName, IEmail, IPassword, IPhone {}

export default IUser;
