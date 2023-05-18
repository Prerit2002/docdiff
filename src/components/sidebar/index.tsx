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
    <div className="font-2xl flex ">
      {repo === undefined  ? 
      <div className="bg-repos  rounded-large h-screen   overflow-y-auto">
      <h1 className="bg-sidebar rounded-small font-semibold p-1">Repositories</h1>
    {!loading
      ? data?.viewer?.repositories?.nodes?.map((node: any) => {
          return (
            <div
              className="cursor-pointer text-2xl text-left mt-1  "
              onClick={() => {
                setRepo(node.name);
              }}
            >
              <h1
                className={
                  repo === node.name ? "text-slate-300 ml-5" : "text-black ml-4 hover:text-slate-200"
                }
              >
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
      <img alt="repo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAACjo6OZmZnz8/OgoKA+Pj40NDTk5OS4uLjq6urt7e0xMTE4ODjLy8s7Ozv4+PhOTk66urrDw8NjY2OqqqpYWFiAgICxsbG/v794eHjf399TU1MZGRmoqKjU1NQSEhJFRUWUlJSEhIQiIiIpKSloaGiMjIxxcXFJSUnQ0NDx0u5bAAAJMUlEQVR4nOWdaVurPBCGiUWtrQsea11q1boc6/n/P/AtTTcgMJktJH3vj16XgcdMZh6SAbMsGMX1w5VZMZ++zsJdNRz5x6XZM3nr+37EebsyVT77viNh7k2D27zvm5LktCnQmLNh37clx6NLoDFX475vTIoWgcacH4lEZ4huZvEoAtWRZPbcjPq+PT6tIboJ1OQz6km3QGMuEw9UUGDqRQMI0c0sJhyonUlmz3my6aajTFS5STRQvULUkqa7QQhMs2h4h+hGYnKB+ooTuCoaiaWbC6zA1ALVo9A3uUxoFpFrcEs67gaVRSuzmEigejoZF2m4mye6wETcTT7hSEzC3RRTjsQ0igZPYgqBWrACNQl3wwvUNIoGT2IKs5jxAvX41+L/IaNGVxevHT9jzWJs7ubePDR/yAvUuDb8y6eJ5+aPj8fd2OdBh0Rm0YgmULdP9OKBGou72e/JuAKVJTEOd3O4qyYfqBHMYnVPxhGoqbub+p6M+FrsO6M2N53EA7Vfd+PaNnQFKktin+0M7l21I3I3bfuiR+Nu2rfuj8TddJ1NyLubHiR2ny61Sfw6m0zOvggSw7sbaOveFaiDp03iz+8+37ESQ2/4w6dLrqJxQHFyCQ5RJWyg+pwuARKz8QNSYsgNf7/jM1egVrhDSgznbnwPQEGJM2TOCeVu/M8HoUDN/uEUBnokxjQhgLOIPS4O4W5wTQigxGekRH13g+2ygAJ1hBxPvWjgmxAgidiaoexuKE0IQIqfReVuKH0yU2hQvCPX2/An9ck8QqMO8GNquRtaIxD4ktqMMKhO0aC1csHZfUwZVqOdAd1OaVmAf+38mzKuvLshtFOuARNNlt+QBpYuGqR2ypLbQkmh8IY/sZ1yxRmY9nJ0QdwOLbgWye2UxnyBLzWTMs0auUBltFMa8w8aHfscfICUu6GHaMkAGh77dHGIjLthzeDKf0Dj/+WMfiPgbhhr0AKZmjExl1r47oYXoiV/wWvwJDIDlehkKoC5ZnzLGZ7nbqhOpgJc9EcLzvicoiExg8Zjyy0rzlgSybPIX4MbPsBL5b+c8anuhp1F95yAFxuxJNIyKrMOVnmGDTgrUCkb/mIhanm/gy5YLDjj4zf8RWdwzRQq/SNW0cC2MwiuwR3VfONYOSHdjXCIWqoe/MNlyVkSMRv+5Cf6Tga1a5w2LxzK3Yg4mSZ1hS6JYdyNkJNp0FDokshzN36PxCprsKSp0CVR391oZFGLQ6EzUJXdjZ5Ap0LnLKq6G7UQNS0KnWtxwblMt7uRdzIHuBU6A1XN3SiGqGlV6KyLSu5Gp9DvaFPokqjjbpQFtitUcDdOiboharoUtrmbr+nPYPB8O8dfy+VuVJPMmg6FzqLxuLvLt0H926AgTXejWSY2dCl0rsUDiidskaxv+KuHqAEUQhKz/Ad5uWo7QwiBgEJQIqtZM0CIGlAhLJHerKmfZNZACuVn8WyTq95E7h8GVAhLxM7Fy/q3cnQmJgIrhCViW8R+yl/6ELh5LzwUghLRDVSzVaXBvhVAxkchKBF7YrzMsmv2nfvipXAOKMQmjfkQ38FKxkvhPaCwwDryiyxUnvFUCLYyYmdkmbFv3BsfhVfgdiB2M/cqMoVwox+6hSoyhXDjRuoKlwoKCQ/QRPpR+M17PxeFj8KJuMKp2jlMEx+Fv+B5P9ahDEit8jR8FL6D9RBro9+YH+bA4FXx/0AKkavqNwv3eOin8AUQOENmxvVf7JN/8154KTSAqUG+YfNi1zVre9kfP4Xd/yWpQF5z8/casw7svPFTaDpb35Fbirs2pWGQBwxPhdOOgoHMGRf73xyfc2/fA0+FHXE6wr1AVGk0GweYRV+Frc2ayOPvWifdkHVg54W3wpZmTWQjykX990fqgeqv0Cwda/EaF6JPjhjQ3nRDKDTmsXYAOFriLub6Fmc2VC4aKIVmcZrvJrKYPSBfUmwxf0PdWcQpXDH9eLybvT2d/KD/9K3uNlddi2iFZJwhuol2zYwaTKEjyRwEqmJdDKWwUSaqKLqbQArBlnm9tRhGYcca3AWqVtEIohAIUYuWuwmhsDPJ7FFyNwEUeoToZhZVAlVfIbiNtUfF3agrRAjUyajaCr1D1KLgbpQVgnWwjry70VXoVSaqiLub6teGhDvN0DNYIrsWP2uPtDnykbYb5BrcIuhurhy3cCf3FySEqGUkVTRenN3zvF7uAzydjAshd9N6Oi9z7kUMUYuIu2k/9sxfBIZnzGDJkL9Yuj7CM+QLJK/BLfyM2nkL7EN2VohaeG/oGHPbPTxzpZPqYB3mhj8QRbxXctkhamE9Er8Dg7POhERmsIRTNLrPdFcwvI3AGtzCcDfgXfwhD416HoQguxu4QYb8vTZRgfRAhT/GRf3mnmCIWojuZgF/toWWaphOxgXN3cCteDSFQmWidisUiR7fL6WUW/EQtVBKF7wOKZlGrA7WIbgblVyqEqIWgrsB4wlv29RmsARfNMC+ZrSnUVqDW9DuBnrNB72lJ1zoHRKxswgULuwLuuoC8UXjvLvmIztilUPUgnU3r12DITeGFZyMC+SG/7xjnwbZR69YJqogs0P7t0bGuEWtWiZqd4abxbamWF47pS7IojF1ejdk93WwELUg3c2XIwc+4dJooCSzB+tulrV8M0O+GhKkTFTBupv53+tdP2V+h30nO0Chd0hEe9T55ON0xc8EvXHRi0DtZs1DeghRi2qz5gFBy0SVMK+iBC4TVUK8itLjDJbor8Xe1uAW7Q7/XkPUItbO4CS4k3Gh+SpK7yFq0WnWLOmp0DfRehUlGoFaGTWSELVouJue62Ad+fcXIygTVaTdTWQzWCK7FqNag1sk3U10IWqRczdROBkXUu4myhC1yLibaGewRKBZM9Y1uIWfUSMOUQv36wwR1sE6PHcTeYhaOM2aCcxgCb1oRL8Gt1DdTUTPgxA0d5OQQFrRSCZELXh3E7WTcYF1N0mUiSr5AiMwsRC1YD5qnEgdrOP/3laCIWrxncXkkswBXv9hLMk1uMUnUJMq9E0KcBYTF5iBX9ZMOkQtRWegppxkduQds5hsmajRKjHRQu+gReLxCGwpGscSomtc6eaIZnBN/QvAL8j/o50As+eDjtnfP+B7iSkyvFiW28Xf0wH4upcg/wH+05qcxbEDXwAAAABJRU5ErkJggg==" ></img>

  </div>
      
      
      
    }
      
      
      {/* condition to show files if repo is selected */}
      {repo && (
        <div className=" p-2  bg-files">

        {repos.loading ? (
             <img className="w-32 mt-32 h-24 animate-bounce"  alt="loading" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2gc652wTSA8QwA5FC4m38PP1DqRmhEyQI4uljhL4fEkyZroMeyH3lGVxLFja6U4ZQOg&usqp=CAU"  />
           
        ): <h1 className="bg-blue-300 rounded-small font-semibold p-1">Files</h1>}
         
      {!repos.loading &&
        repos.data?.viewer?.repository?.object?.entries?.map((file: any) => {
          return (
            <>
            
              <div
                className={file.type === "tree" ? "cursor-pointer flex m-2" : "flex m-2"}
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
                  {  file.type === "tree" ? <img className="w-3 h-3 mt-2 mr-0.5 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAclBMVEX///8AAADNzc3ExMQgICCOjo5aWlrBwcE3Nzfx8fH6+vrKyspwcHAuLi719fXg4OClpaVISEjT09M+Pj5RUVGPj4+CgoKIiIisrKwzMzMoKCi7u7tBQUF4eHi0tLRra2sVFRViYmLp6ekPDw+ampqmpqYgl+OzAAADxUlEQVR4nO3d63qaQBSFYTBRDiICclKMGmPv/xarNil7BqypzjBkz/p+VZKS/RY52j51HKnAm0arxeujbfw8mjZLea1jL6y3rprKzLTlP4oLReprW8+057vVKtmX/Ilp0ncKc9Xuc2+mVfdbamCfO4z9MJfpcZ8b956uaXtfS0zj/lGs0e26hWne7VKtcLcy7btVotc9Wnkgz5medt7LgzW7ZH/oyEvTxt5Kcchp/PQas/1P2ObiBk+fZ19aypdDI5QLe/i7stXuJPn4LuJ8Mp2vcL3HjShX92eqpiMdLlC55lA6S/pK1/50DRlN9aWGvKPPFa//qSoymJoDG0m+MipD1T/h8d7bsXL1a+9cE+7U/4wHI4cgHbcTHfliLHRymdXoWP9alrtu1Cjfpx5I+7HH78pd9xBVp7rxBull3vs0hEyj6RHZqk8+cNuq89SXfFXXs0HNd73fbHMSTynkS9oeinbuWQx1GhruKH1g/0QbsreTxRofg08+jGHF6oHhThgZs4r9vT8my/R+8DFfGMMKfd0fk0W6P/Hxei5mDFQNDnecbBRv+GZ4+Hlf90rzFzSBAfileFJP97M8XflD1LN/zQzBhy723iT55a7EAvi5QLx43Dq2wOW/9pDZA3c8Cn+zCO6cqNwmuPBIJLMJPifWxCY4fb5YWgUnnwunVsHJB5mvVsHJGe3DKviEns8AB5xvgAMOOO8AB/xPP+kfDj1UdgMeFVPWFdENuFUBbluA2xbgtgW4bQF+Lp0xL70Bt/YmxdrbUsC5BjjggPMOcMAB5x3ggAPOO8ABB5x3gAMOOO8ABxxw3gEOOOC8AxxwwHkHOOCA8w5wwAHnHeCAA847wAEHnHeAAw447wAHHHDeAQ444LwDHHDAeQc44IDzDnDAAecd4IADzjvAAQecd4ADDjjvAAcccN4BDjjgvAMccMB5BzjggPMOcMAB5x3ggAPOu1vwuenBdDen8EP7653pwXTXtNaDs2hfJKYH013SWhfOe/siNz2Y7vLWuncq8r6PTU+mt5hQK/q+dwvTo+mtIFTPCcgrNzA9m85k6Yq89E0Pp7M1ga4c4VDnujPT0+lrRp2XE5jwDnDXR9MD6um4FpjXfboUFrkVw2N7XInG8rpU3OTn8mTnvbDJ2yW5LPzctom8nHu/vt4J6f3v5VTa7gKmRxk2chBbmp5lyJb0sJfd/34uSf/LujXbfOlIhZ1jPsfysOcsvzM9lf7q/uubsLj/W39yRd/m/qTXbE/paX2bfS3wptFq8cqoxSqaep0nDb8B68ZXIgFNtpgAAAAASUVORK5CYII=" alt="folder" /> : <img className="w-3 h-3 mt-2 mr-0.5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/File_alt_font_awesome.svg/1024px-File_alt_font_awesome.svg.png" alt="folder" />}
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
