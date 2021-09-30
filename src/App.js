import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");
function App() {
  const [fileUrl, updateFileUrl] = useState(``);
  const [isLoading, setIsLoading] = useState(false);

  async function onChange(e) {
    const file = e.target.files[0];
    console.log(file);
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      updateFileUrl(url);
      setIsLoading(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={(e) => {
          setIsLoading(true);
          onChange(e);
        }}
      />
      {fileUrl && <img src={fileUrl} width="600px" height="600px" />}
      {isLoading ? <div>IMAGE LOADING</div> : <div></div>}
    </div>
  );
}
export default App;
