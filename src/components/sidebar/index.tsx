import { useState } from "react";
import { useQuery } from "@apollo/client";
import { getRepos, getFileTree } from "../../queries";
import Files from "./Files";

function Sidebar({
  setText,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [repo, setRepo] = useState<String | null>();
  console.log(repo)
  const [oid, setOid] = useState<string[]>([]);
  const { data, loading } = useQuery(getRepos);
  const repos = useQuery(getFileTree, {
    variables: {
      name: repo,
    },
  });

  if (!repos.loading) {
    console.log("abcd", repos.data);
  }
  console.log(oid);
  return (
    <div className="font-2xl flex flex-no-wra">
      {repo === undefined  ? 
      <div className=" rounded-large h-screen flex-nowrap  sm:relative bg-gray-800 shadow  flex-col justify-between hidden sm:flex   overflow-y-auto">
      <h1 className="bg-sidebar rounded-small font-semibold p-1">Repositories</h1>
      
      
    {!loading
      ? data?.viewer?.repositories?.nodes?.map((node: any) => {
          return (
            <div
              className="cursor-pointer text-xl text-left mt-2 mx-2  "
              onClick={() => {
                setRepo(node.name);
              }}
            >
              <h1
                className={
                  repo === node.name ? "text-slate-300 ml-5" : "text-black ml-4 hover:text-slate-200"
                }
              >
                {/* repositories icon */}
               


                 {node.name}
              </h1>
            </div>
          );
        })
      : null}
  </div>

  :
  <div className=" w-10 p-2 bg-black cursor-pointer" onClick={
    () => {
      setRepo(undefined)
    }

  }>
      <img alt="repo" src="data:image/png;base64,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" ></img>

  </div>
      
      
      
    }
      
      
      {/* condition to show files if repo is selected */}
      {repo && (

        <div style={{minWidth: '9rem',}} className="  bg-slate-600">

        {/* {repos.loading ? (
             <img className="w-32 mt-32 h-24 animate-bounce"  alt="loading" src="data:image/jpeg;base64,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"  />
           
        ): <h1 className="bg-blue-300 rounded-small font-semibold p-1">Files</h1>}
          */}

<h1 className={`bg-blue-300 rounded-small font-semibold p-1  ${repos.loading ? "animate-pulse" : ""}`}>Files</h1>
      {!repos.loading &&
        repos.data?.viewer?.repository?.object?.entries?.map((file: any) => {
          return (
            <>
            
              <div
                className={file.type === "tree" ? "cursor-pointer flex m-4" : "cursor-context-menu flex m-4"}
                onClick={() => {
                  if (file.type === "tree") {
                    if (oid.includes(file.oid)) {
                      setOid((prevOids) =>
                        prevOids.filter((item) => item !== file.oid)
                      );
                    } else {
                      setOid((prevOids) => [...prevOids, file.oid]);
                    }
                  }
                  if (file?.object?.text) {
                    setText(file?.object.text);
                  }
                }}
              >
                  {  file.type === "tree" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue" className="bi bi-folder-fill mt-1 mr-1" viewBox="0 0 16 16">
  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightpink" className="bi bi-file-earmark-text mt-1 mr-1" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
</svg>}
                <h1 className={oid.includes(file.oid) ? "text-gray-500 whitespace-nowrap" : "text-black whitespace-nowrap"} >{file.name}</h1>
              </div>
              {oid.includes(file.oid) && (
                <div>
                  <Files oid={file.oid} name={repo!} setText={setText} />
                </div>
              )}
            </>
          );
        })}
    </div>

      )}


      

      <hr />
    </div>
  );
}

export default Sidebar;
