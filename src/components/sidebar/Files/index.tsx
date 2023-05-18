import { useState } from "react";
import { useQuery } from "@apollo/client";
import { getInnerFiles } from "../../../queries";
function Files({
  oid,
  name,
  setText,
}: {
  oid: String;
  name: String;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [oidArray, setOid] = useState<string[]>([]);
  console.log("oid", oid);
  console.log("name", name);

  const { data, loading } = useQuery(getInnerFiles, {
    variables: {
      oid,
      name,
    },
  });

  if (!loading) {
    console.log("hi", data);
  }

  return (
    <div> 
      {!loading &&
        data?.viewer?.repository?.object?.entries?.map((file: any) => {
          return (
            <>
              <div className={file.type === "tree" ? "cursor-pointer flex" : "flex "}
                onClick={() => {
                  if (file?.object.text) {
                    setText(file?.object.text);
                  }
                  if (file.type === "tree") {
                    if (oidArray.includes(file.oid)) {
                      setOid((prevOids) =>
                        prevOids.filter((item) => item !== file.oid)
                      );
                    } else {
                      setOid((prevOids) => [...prevOids, file.oid]);
                    }
                  }
                }}
              >
                  {  file.type === "tree" ? <img className="w-3 h-3 mt-2 mr-0.5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAclBMVEX///8AAADNzc3ExMQgICCOjo5aWlrBwcE3Nzfx8fH6+vrKyspwcHAuLi719fXg4OClpaVISEjT09M+Pj5RUVGPj4+CgoKIiIisrKwzMzMoKCi7u7tBQUF4eHi0tLRra2sVFRViYmLp6ekPDw+ampqmpqYgl+OzAAADxUlEQVR4nO3d63qaQBSFYTBRDiICclKMGmPv/xarNil7BqypzjBkz/p+VZKS/RY52j51HKnAm0arxeujbfw8mjZLea1jL6y3rprKzLTlP4oLReprW8+057vVKtmX/Ilp0ncKc9Xuc2+mVfdbamCfO4z9MJfpcZ8b956uaXtfS0zj/lGs0e26hWne7VKtcLcy7btVotc9Wnkgz5medt7LgzW7ZH/oyEvTxt5Kcchp/PQas/1P2ObiBk+fZ19aypdDI5QLe/i7stXuJPn4LuJ8Mp2vcL3HjShX92eqpiMdLlC55lA6S/pK1/50DRlN9aWGvKPPFa//qSoymJoDG0m+MipD1T/h8d7bsXL1a+9cE+7U/4wHI4cgHbcTHfliLHRymdXoWP9alrtu1Cjfpx5I+7HH78pd9xBVp7rxBull3vs0hEyj6RHZqk8+cNuq89SXfFXXs0HNd73fbHMSTynkS9oeinbuWQx1GhruKH1g/0QbsreTxRofg08+jGHF6oHhThgZs4r9vT8my/R+8DFfGMMKfd0fk0W6P/Hxei5mDFQNDnecbBRv+GZ4+Hlf90rzFzSBAfileFJP97M8XflD1LN/zQzBhy723iT55a7EAvi5QLx43Dq2wOW/9pDZA3c8Cn+zCO6cqNwmuPBIJLMJPifWxCY4fb5YWgUnnwunVsHJB5mvVsHJGe3DKviEns8AB5xvgAMOOO8AB/xPP+kfDj1UdgMeFVPWFdENuFUBbluA2xbgtgW4bQF+Lp0xL70Bt/YmxdrbUsC5BjjggPMOcMAB5x3ggAPOO8ABB5x3gAMOOO8ABxxw3gEOOOC8AxxwwHkHOOCA8w5wwAHnHeCAA847wAEHnHeAAw447wAHHHDeAQ444LwDHHDAeQc44IDzDnDAAecd4IADzjvAAQecd4ADDjjvAAcccN4BDjjgvAMccMB5BzjggPMOcMAB5x3ggAPOu1vwuenBdDen8EP7653pwXTXtNaDs2hfJKYH013SWhfOe/siNz2Y7vLWuncq8r6PTU+mt5hQK/q+dwvTo+mtIFTPCcgrNzA9m85k6Yq89E0Pp7M1ga4c4VDnujPT0+lrRp2XE5jwDnDXR9MD6um4FpjXfboUFrkVw2N7XInG8rpU3OTn8mTnvbDJ2yW5LPzctom8nHu/vt4J6f3v5VTa7gKmRxk2chBbmp5lyJb0sJfd/34uSf/LujXbfOlIhZ1jPsfysOcsvzM9lf7q/uubsLj/W39yRd/m/qTXbE/paX2bfS3wptFq8cqoxSqaep0nDb8B68ZXIgFNtpgAAAAASUVORK5CYII=" alt="folder" /> : <img className="w-3 h-3 mt-2 mr-0.5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/File_alt_font_awesome.svg/1024px-File_alt_font_awesome.svg.png" alt="folder" />}
                 <h1 className={oidArray.includes(file.oid) ? "text-gray-500" : "text-black"}> {file.name}</h1>
               
              </div>
              {oidArray.includes(file.oid) && (
                <div>
                  <Files oid={file.oid} name={name} setText={setText} />
                </div>
              )}
            </>
          );
        })}
    </div>
  );
}

export default Files;
