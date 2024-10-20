import Doc from "@/components/doc";
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [datas,setDatas] = useState()

  const [action,setAction] = useState(0)

  const handleClick = async () => {
    try {
      const request = await axios.get('/api/getFolder')
      setDatas(request.data)
    } catch (error) {
      console.log("🚀 ~ handleClick ~ error:", error?.response?.data)
    }
  }

  const handleStart = () => setAction(1)

  return (
    <>
      
      <div style={{display: 'flex', direction: "row", gap: 10}}>
        <table>
          <thead>
          <tr>
              <td>id</td>
              <td>folder name</td>
              <td>loading</td>
          </tr>
          </thead>
          <tbody>
            {datas && datas?.map((item,key) => 
              <Doc 
                key={key} 
                stt={key + 1} 
                id={key + 1} 
                folderName={item} 
                action={action} 
                setAction={setAction}
                end={datas?.length}
              />
            )}
          </tbody>
        </table>
        <div style={{position: 'fixed', top: 10, right: 50}}>
          <button onClick={handleClick}>click</button>
          <button onClick={handleStart}>bắt đầu</button>
          <div>dang xu ly {action} / {datas?.length}</div>
        </div>
      </div>
    </>
  );
}
