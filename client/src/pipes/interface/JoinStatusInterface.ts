/**
 * 폼 필드 상태를 나타내는 인터페이스입니다.
 *
 * 각 필드는 해당 HTML 요소를 참조하거나 null 값을 가질 수 있습니다.
 *
 * @interface
 * @date 24.08.08
 */
interface JoinStatusInterface {
  name: HTMLElement | null;
  email: HTMLElement | null;
  password: HTMLElement | null;
  checkPassword: HTMLElement | null;
  phone: HTMLElement | null;
}

export default JoinStatusInterface;
