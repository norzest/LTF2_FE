// writer: 권혁준
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { LGButton } from "./Button";

const style = {
  boxSizing: "border-box",
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 300,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  FontFamily: "Noto Sans KR",
  textAlign: "center",
  verticalAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  p: 4,
};

export default function MessageModal({
  open,
  setOpen,
  type,
  message,
  btnMessage,
  func,
}) {
  const handleClose = () => setOpen(false);
  const btnText = btnMessage === "" ? "확인" : btnMessage;
  const run = func === "" ? handleClose : func;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "20px" }}
            >
              {message}
            </Typography>
            <div style={{ display: "flex" }}>
              {type === "YN" && (
                <LGButton
                  variant="light"
                  onClick={handleClose}
                  children="닫기"
                />
              )}
              <LGButton onClick={run} children={btnText} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
