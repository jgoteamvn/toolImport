import { Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

export default function GetTotal(){

    const [folderName,setFolderName] = useState("")

    const handleClick = async () => {
        console.log(folderName)
        try {
            const request = await axios.post('/api/v2/getFolder', {folderName})
            console.log("🚀 ~ handleClick ~ request:", request.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Flex direction={"row"} align={"center"} gap={"2"}>
            <TextField.Root
                name="folderName"
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder name"
            />

            <Button onClick={handleClick}>Lấy tổng</Button>
        </Flex>
    )
}