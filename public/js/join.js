import { joinSuccess } from "./modules/functions/join/joinHandle.js";
import { statusCondition } from "./modules/functions/join/joinStatus.js";
import { joinForm } from "./modules/selector.js";

statusCondition();
joinForm.addEventListener('submit', joinSuccess);
