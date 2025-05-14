export const ChromePointer = () => {
  const style = {
    width: "12px",
    height: "12px",
    borderRadius: "6px",
    border: "1px solid #2B2C2B",
    transform: "translate(-6px, -1px)",
    cursor: "pointer",
    backgroundColor: "rgb(248, 248, 248)",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)",
  };

  return <div style={style} />;
};

export default ChromePointer;
