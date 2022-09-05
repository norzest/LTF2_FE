// writer: 권혁준
import * as DetailInfo from "../styles/detailInfoStyle";
import { Row } from "../styles/gridStyle";
import { LGButton } from "./Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

export function DetailPrice({
  active,
  nowActive,
  handleModal,
  planList,
  changePlan,
  setShowPlan,
}) {
  const [more, setMore] = useState(false);

  const threePlans =
    planList
      .slice(0, 3)
      .map((row) => row.planId)
      .indexOf(active.plan.planId) !== -1
      ? planList.slice(0, 3)
      : [active.plan, ...planList.slice(0, 2)];

  // 공시지원금 할인 요금
  const support = active.supportPrice.toLocaleString();

  const optAgree = (month) =>
    (active.plan.monthPrice * 0.25 * month).toLocaleString();

  const installmentArr = more
    ? [1, 3, 6, 9, 10, 12, 24, 30, 36, 48]
    : [1, 12, 24, 36];

  // 현재 선택된 할부인지
  const thisInstallment = (month) =>
    active.installment === month ? "dark" : "outline-dark";

  // 배송 선택 버튼
  const ShipBtn = ({ ship }) => (
    <LGButton
      variant={active.ship === ship ? "dark" : "outline-dark"}
      size="lg"
      rec
      style={{ margin: "0px 0.5%", width: "49%" }}
      onClick={() => nowActive("ship", ship)}
    >
      {ship}
    </LGButton>
  );

  const OptAgreeRadio = ({ month }) => (
    <FormControlLabel
      value={month}
      control={
        <Radio
          sx={{
            color: "#e6007e",
            "&.Mui-checked": {
              color: "#e6007e",
            },
          }}
        />
      }
      label={`${month}개월 할인`}
    />
  );

  // 할부 선택 버튼
  const InstallmentBtn = ({ month }) => (
    <LGButton
      variant={thisInstallment(month)}
      style={{
        width: "24%",
        margin: "0.5% 0.5%",
      }}
      onClick={() => nowActive("installment", month)}
      children={month === 1 ? "카드/간편결제" : `${month}개월`}
    />
  );

  return (
    <DetailInfo.Container>
      <div>
        <DetailInfo.PriceRow>
          <div className="label">배송방법</div>
          <div className="content">
            <p>배송비는 무료입니다.</p>
            <Row justify="center">
              <ShipBtn ship="우체국 택배" />
              <ShipBtn ship="오늘 도착" />
            </Row>
            <li>
              평일 오후 4시까지 신청하면 다음 날 받을 수 있습니다. 도서, 산간
              지역은 2일 정도 걸립니다.
            </li>
            <li>주말 및 공휴일에는 배송 업무를 쉽니다.</li>
          </div>
        </DetailInfo.PriceRow>
        <DetailInfo.PriceRow>
          <div className="label">요금제</div>
          <div className="content">
            <p style={{ float: "left" }}>추천 요금제</p>
            <p
              onClick={handleModal}
              style={{
                float: "right",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              다른 요금제 선택 {">"}
            </p>
            {threePlans.slice(0, 3).map((row) => (
              <DetailInfo.PlanCard
                key={row.planId}
                now={active.plan.planId === row.planId}
                onClick={() => changePlan(row)}
              >
                <DetailInfo.PlanTitle children={row.name} />
                <DetailInfo.PlanPrice
                  children={`${row.monthPrice.toLocaleString()}원`}
                />
                <DetailInfo.PlanDescription>
                  <div>
                    <p>{`데이터 ${row.data}, 음성 ${row.voice}${
                      row.shareData === ""
                        ? ", 나눠쓰기 사용가능"
                        : `, 나눠쓰기 ${row.shareData}`
                    }`}</p>
                  </div>
                  <div className="icon">
                    <AddCircleOutlineIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPlan({ row: row, show: true });
                      }}
                    />
                  </div>
                </DetailInfo.PlanDescription>
              </DetailInfo.PlanCard>
            ))}
          </div>
        </DetailInfo.PriceRow>
        <DetailInfo.PriceRow>
          <div className="label">
            할인유형
            <br />
            할부기간
            <p className="des">
              할인유형과 할부기간을 <br />
              선택해주세요.
            </p>
          </div>
          <div className="content">
            <p>할인유형</p>
            {active.discount === 0 ? (
              <DetailInfo.NoContractDiv>
                <div>
                  선택하신 요금제는 무약정 요금제로 공시지원금(휴대폰 가격
                  할인),
                  <br />
                  선택약정할인(통신료 25% 할인), 7% 추가요금 할인 및 가족 결합
                  할인이 제공되지 않습니다.
                </div>
              </DetailInfo.NoContractDiv>
            ) : (
              <div
                style={{
                  display: "flex",
                }}
              >
                <DetailInfo.DiscountCard
                  left
                  active={active.discount === -1}
                  onClick={() => nowActive("discount", -1)}
                >
                  <p className="type" children="공시지원금" />
                  <p
                    className="type-description"
                    children="휴대폰 가격 1회 할인"
                  />
                  <p className="type-support-price">
                    총 -<span>{support}</span>원
                  </p>
                </DetailInfo.DiscountCard>
                <DetailInfo.DiscountCard disabled active={active.discount > 11}>
                  <p className="type" children="선택약정" />
                  <p
                    className="type-description"
                    children="통신요금 25% 할인"
                  />
                  <DetailInfo.DiscountPrice>
                    <FormControl style={{ width: "40%" }}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={active.discount}
                        onChange={(e) => nowActive("discount", e.target.value)}
                      >
                        <OptAgreeRadio month={24} />
                        <OptAgreeRadio month={12} />
                      </RadioGroup>
                    </FormControl>
                    <div
                      style={{
                        width: "60%",
                        display: "inline-block",
                      }}
                    >
                      <p className="type-price" style={{ margin: "0" }}>
                        총 -<span>{optAgree(24)}</span>원
                      </p>
                      <p className="type-price" style={{ margin: "5px 0" }}>
                        총 -<span>{optAgree(12)}</span>원
                      </p>
                    </div>
                  </DetailInfo.DiscountPrice>
                </DetailInfo.DiscountCard>
              </div>
            )}
            <p>
              할부기간 (카드 / 간편결제 옵션 선택 시 일시불 혹은 할부 옵션을
              선택할 수 있습니다.)
            </p>
            <Row justify="center">
              {installmentArr.map((row) => (
                <InstallmentBtn month={row} key={row} />
              ))}
              <LGButton
                style={{ width: "24%", margin: "0.5% 0.5%" }}
                variant="primary"
                children={more ? "접기" : "더 보기"}
                onClick={() => setMore(!more)}
              />
            </Row>
          </div>
        </DetailInfo.PriceRow>
      </div>
    </DetailInfo.Container>
  );
}
