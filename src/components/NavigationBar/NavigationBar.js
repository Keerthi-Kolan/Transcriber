import "./NavigationBar.css";
const NavigationBar = ({ signOut }) => {
  return (
    <div className="navbar">
      Transcriber
      <div className="links">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
};
export default NavigationBar;
