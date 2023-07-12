import { useQuery } from "@apollo/client";
import {getUser} from '../../queries'

function Navbar() {
    const {data , loading} = useQuery(getUser)
    if (!loading){
        console.log("hi" ,data)
    }
    return (
        <div className="flex justify-between items-center  bg-gray-800  px-2 sm:px-6 lg:px-8 h-16  p-2 text-gray-400">
            <div>
                {!loading && !data  ? 
                <a
                href={`https://github.com/login/oauth/authorize?client_id=Iv1.644cd5b7b12c0fd5&scope=user&redirect_uri=http://localhost:3000/`}
              >
                <button className="ml-2 m-2 bg-gray-800 text-white flex p-2 rounded-sm"> <img className="mr-1 mt-0.5 h-5 w-5" alt="github logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />Login With Github</button>
              </a>
              : <h1 className="m-2 text-white text-xl  ">DOCDIFF</h1>

                

                }
            
            </div>
            <div>
                { data  && (
                    <h1 className="m-2  text-white text-xl ">Hello {data?.viewer.login}</h1>
                )}
            </div>

            
        </div>
    )
}

export default Navbar
