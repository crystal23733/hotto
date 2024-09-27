import IBlance from "./IBlance";
import IDailyTokenLimit from "./IDailyTokenLimit";
import IEmail from "./IEmail";
import IName from "./IName";
import IPassword from "./IPassword";
import ITokensUsedToday from "./ITokensUsedToday";
import IId from "./_IId";

interface IUser
  extends IName,
    IEmail,
    IPassword,
    IId,
    ITokensUsedToday,
    IDailyTokenLimit,
    IBlance {}

export default IUser;
