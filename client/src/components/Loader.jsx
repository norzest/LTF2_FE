// writer: 권혁준
import HashLoader from "react-spinners/HashLoader";

export default function Loader() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "85vh",
        textAlign: "center",
      }}
    >
      <HashLoader
        color="#e6007e"
        size={200}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          marginTop: "-50px",
        }}
      />
    </div>
  );
}
