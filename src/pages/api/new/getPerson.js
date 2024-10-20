import { getAttribute } from "@/components/new/attribute"
import { api_url, rootDir, token } from "@/components/new/const"
import axios from "axios"
import fs from 'fs.promises'

function formatArray(datas){
    let result = []
    datas.map(item => result.push(item.name))
    return result
}

export default async function handler(req, res) {

    try {

        // lấy ds người ký trên api
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${api_url}/backend/sign-persons?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${token}`, 
            },
        };
        const getAll = await axios(config)
        let allSignPerson = getAll.data.data

        const sign_person_db = formatArray(allSignPerson)

        const folders = await fs.readdir(rootDir) 

        let result = []

        for(let i =0;i< folders.length;i++){

            // lấy dc attribute
            const {sign_person} = await getAttribute(folders[i])

            // Lấy người ký
            // const personId = await getPersonId(sign_person)

            if(sign_person_db.includes(sign_person) == false){
                // thêm mới vào db
                result.push({
                    "name": sign_person,
                    "position_id": 1
                })

            }
        }

        // ghi vào file json
        // await fs.writeFile(`./src/components/new/json/person.json`, JSON.stringify(allSignPerson))

        return res.status(200).json(result)

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(400).json("loi")
    }
    
}