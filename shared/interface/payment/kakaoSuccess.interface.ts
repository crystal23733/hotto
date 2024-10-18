/**
 * 결제 승인 응답 인터페이스
 * @property {string} aid - 요청 고유 번호 (승인/취소가 구분된 결제번호)
 * @property {string} tid - 결제 고유 번호 - 승인/취소가 동일한 결제번호
 * @property {string} cid - 가맹점 코드
 * @property {string} sid - 정기 결제용 ID, 정기 결제 CID로 단건 결제 요청 시 발급
 * @property {string} partner_order_id - 가맹점 주문번호, 최대 100자
 * @property {string} partner_user_id - 가맹점 회원 id, 최대 100자
 * @property {string} payment_method_type - 결제 수단, CARD 또는 MONEY 중 하나
 * @property {Object} amount - 결제 금액 정보
 * @property {number} amount.total - 총 결제 금액
 * @property {number} amount.tax_free - 비과세 금액
 * @property {number} amount.vat - 부가가치세(VAT)
 * @property {number} amount.point - 사용된 포인트
 * @property {number} amount.discount - 적용된 할인 금액
 * @property {Object} card_info - 결제 상세 정보, 결제 수단이 카드일 경우만 포함
 * @property {string} card_info.kakaopay_purchase_corp - 카카오페이 매입사명
 * @property {string} card_info.kakaopay_purchase_corp_code - 카카오페이 매입사 코드
 * @property {string} card_info.kakaopay_issuer_corp - 카카오페이 발급사명
 * @property {string} card_info.kakaopay_issuer_corp_code - 카카오페이 발급사 코드
 * @property {string} card_info.bin - 카드 BIN 번호 (카드 식별자)
 * @property {string} card_info.card_type - 카드 종류 (예: 신용카드)
 * @property {string} card_info.install_month - 할부 개월 수
 * @property {string} card_info.approved_id - 카드사 승인번호
 * @property {string} card_info.card_mid - 카드사 가맹점 ID
 * @property {string} card_info.interest_free_install - 무이자 할부 여부 ("Y"/"N")
 * @property {string} card_info.installment_type - 할부 유형 (예: 일반, 무이자)
 * @property {string} card_info.card_item_code - 카드 상품 코드
 * @property {string} item_name - 상품 이름, 최대 100자
 * @property {string} item_code - 상품 코드, 최대 100자
 * @property {number} quantity - 구매 수량
 * @property {string} created_at - 결제 생성 시각 (ISO 8601 형식)
 * @property {string} approved_at - 결제 승인 시각 (ISO 8601 형식)
 * @property {string} payload - 결제 승인 요청에 대해 저장한 값, 요청 시 전달된 내용
 */
export default interface PaymentApprovalResponse {
  aid: string;
  tid: string;
  cid: string;
  sid: string;
  partner_order_id: string;
  partner_user_id: string;
  payment_method_type: string;
  amount: {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
  };
  card_info: {
    kakaopay_purchase_corp: string;
    kakaopay_purchase_corp_code: string;
    kakaopay_issuer_corp: string;
    kakaopay_issuer_corp_code: string;
    bin: string;
    card_type: string;
    install_month: string;
    approved_id: string;
    card_mid: string;
    interest_free_install: string;
    installment_type: string;
    card_item_code: string;
  };
  item_name: string;
  item_code: string;
  quantity: number;
  created_at: string;
  approved_at: string;
  payload: string;
}