import { IsEmail, IsString } from "class-validator";

/**
 * 사용자 정보를 클라이언트에 전달하기 위한 DTO.
 * 비밀번호는 포함되지 않으며, 클라이언트에 안전하게 전달할 수 있는 정보만 포함.
 */
export default class {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
