import { api_url } from "@/components/new/const";
import axios from "axios"
import Cookies from "cookies";

export default async function handler(req, res) {
    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== "development",
    });

    const accessToken = cookies.get("tool_tvpl_token");

    try {
        let data = JSON.stringify({
            "name": req.body.name,
            "position_id":1
        });
          
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/sign-persons`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${accessToken}`, 
            },
            data : data
        };
        
          
        const request = await axios.request(config)
        return res.status(200).json("tạo mới thành công")
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(403).json("tạo mới thất bại")
    }
}