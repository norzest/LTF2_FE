// writer: 권혁준
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as ModalStyle from "../styles/modalStyle";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LGButton } from "./Button";
import { useState } from "react";
import { ComparedModalPhoneBox } from "./ComparedModalPhoneBox";
import ComparedModalDetailBox from "./ComparedModalDetailBox";
import { ComparedModalSelectBox } from "./ComparedModalSelectBox";
import ComparedModalSpecBox from "./ComparedModalSpecBox";

const style = {
  boxSizing: "border-box",
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1280px",
  height: "800px",
  bgcolor: "background.paper",
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

export default function ComparedModal({
  modalShow,
  setModalShow,
  propsList,
  plans,
}) {
  const [opt, setOpt] = useState([
    { tech: "5G", product: "", phoneId: "" },
    { tech: "5G", product: "", phoneId: "" },
    { tech: "5G", product: "", phoneId: "" },
  ]);

  const handleClose = () => {
    setModalShow({ ...modalShow, compare: false });
    setOpt([
      { tech: "5G", product: "", phoneId: "" },
      { tech: "5G", product: "", phoneId: "" },
      { tech: "5G", product: "", phoneId: "" },
    ]);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalShow.compare}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={modalShow.compare}>
          <Box sx={style}>
            <ModalStyle.Header>
              <ModalStyle.Title children="비교결과" />
              <ModalStyle.CloseBtn
                children={<CloseIcon onClick={handleClose} />}
              />
            </ModalStyle.Header>
            <ModalStyle.Body>
              <ComparedModalPhoneBox
                opt={opt}
                setOpt={setOpt}
                modalShow={modalShow}
                setModalShow={setModalShow}
                propsList={propsList}
                plans={plans}
              />
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  children={<Typography children="월 납부금액" />}
                />
                <AccordionDetails
                  children={<ComparedModalDetailBox propsList={propsList} />}
                />
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  children={<Typography children="할인유형, 요금제" />}
                />
                <AccordionDetails
                  children={
                    <ComparedModalSelectBox
                      propsList={propsList}
                      plans={plans}
                    />
                  }
                />
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                  children={<Typography children="기기 성능" />}
                />
                <AccordionDetails
                  children={<ComparedModalSpecBox propsList={propsList} />}
                />
              </Accordion>
            </ModalStyle.Body>
            <ModalStyle.Footer
              children={<LGButton onClick={handleClose} children="확인" />}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
