// writer: 권혁준
import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import * as ModalStyle from "../styles/modalStyle";
import * as PlanStyle from "../styles/planStyle";
import CloseIcon from "@mui/icons-material/Close";
import { LGButton } from "./Button";
import PlanBox from "./PlanBox";

const style = {
  boxSizing: "border-box",
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1280px",
  height: "530px",
  bgcolor: "#fff",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  textAlign: "center",
  verticalAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  fontFamily: "Noto Sans KR",
  p: 4,
};

export default function PlanBoxModal({ showPlan, setShowPlan }) {
  const handleClose = () => setShowPlan((prev) => ({ ...prev, show: false }));
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showPlan.show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={showPlan.show}>
          <Box sx={style}>
            <ModalStyle.Header>
              <ModalStyle.Title children="요금제 보기" />
              <ModalStyle.CloseBtn
                children={<CloseIcon onClick={handleClose} />}
              />
            </ModalStyle.Header>
            <PlanStyle.Container style={{ height: "390px" }}>
              <PlanStyle.PlanBar>
                <PlanStyle.PlanBarItem
                  style={{ width: "525px" }}
                  children={<p children="요금제" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "135px" }}
                  children={<p children="데이터" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "135px" }}
                  children={<p children="나눠쓰기" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "135px" }}
                  children={<p children="음성통화" />}
                />
                <PlanStyle.PlanBarItem
                  style={{ width: "150px" }}
                  children={<p children="메세지" />}
                />
              </PlanStyle.PlanBar>
              <PlanBox row={showPlan.row} />
            </PlanStyle.Container>
            <ModalStyle.Footer>
              <LGButton onClick={handleClose} children="확인" />
            </ModalStyle.Footer>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
