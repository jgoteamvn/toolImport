import { api_url } from "@/components/new/const";
import axios from "axios";
import Cookies from 'cookies'

export default async function handler(req, res) {

    const cookies = new Cookies(req, res, {
        secure: process.env.NODE_ENV !== 'development'
    })

    try {
        let data = JSON.stringify({
            "email": "tuannh1090@gmail.com",
            "password": "123123"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/login-customer`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        const request = await axios.request(config)
        const token = request.data.data.token

        cookies.set("tool_tvpl_token", token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            maxAge: 86400000 * 7,
        })

    } catch (error) {
        console.log("🚀 ~ handler ~ o:", error)
    }

    return res.status(200).json("0k")
}