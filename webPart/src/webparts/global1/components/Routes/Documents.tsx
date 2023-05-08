import * as React from "react";
import { useParams } from "react-router-dom";
import { sp } from "../Context/Auth";

function Documents() {
  const { id } = useParams();
  const [folderData, setFolderData] = React.useState([]);
  const [doc, setDoc] = React.useState<any>("");
  const fileNamePath = encodeURI(doc.name);

  React.useEffect(() => {
    getsingleFolder();
  }, [id]);

  const getsingleFolder = async () => {
    let c = await sp.web
      .getFolderByServerRelativePath(`documentsLibrary/${id}`)
      .files();
    setFolderData(c);
  };

  const handleChange = (e: any) => {
    setDoc(e.target.files[0]);
  };

  const handleDocument = async () => {
    if (doc !== "") {
      await sp.web
        .getFolderByServerRelativePath(`documentsLibrary/${id}`)
        .files.addUsingPath(fileNamePath, doc, { Overwrite: true });
    }
    getsingleFolder();
  };

  return (
    <div>
      <div style={{ marginLeft: "20px" }}>
        <h3>Upload Your Documents</h3>
        <input type="file" onChange={handleChange} />
        <button onClick={handleDocument}>Upload</button>
        <div>
          {folderData?.map((e) => (
            <div>
              <p>{e.Name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Documents;
