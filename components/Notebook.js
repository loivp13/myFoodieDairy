const Notebook = ({ children }) => {
  return (
    <div className="Notebook ">
      <div className="Notebook_left"></div>
      <div className="Notebook_right">
        <div className="Notebook_header" style={{ height: "100%" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Notebook;
