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
            url: `${api_url}/backend/agencies?limit=100000`,
            headers: { 
            'Authorization': `Bearer ${token}`, 
            },
        };
        const getAll = await axios(config)
        let allSignPerson = getAll.data.data

        const sign_person_db = formatArray(allSignPerson)

        const folders = await fs.readdir(rootDir) 

        for(let i =0;i< folders.length;i++){

            // lấy dc attribute
            const {agency} = await getAttribute(folders[i])

            // Lấy người ký
            // const personId = await getPersonId(sign_person)

            if(sign_person_db.includes(agency) == false){
                // thêm mới vào db
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${api_url}/backend/agencies`,
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': `Bearer ${token}`
                    },
                    data : JSON.stringify({
                        "name": agency,
                    })
                };

                const createNew = await axios.request(config)
                allSignPerson.push(createNew.data.data)
            }
        }

        // ghi vào file json
        await fs.writeFile(`./src/components/new/json/agency.json`, JSON.stringify(allSignPerson))

        return res.status(200).json({
            allSignPerson,
            sign_person_db
        })

    } catch (error) {
        return res.status(400).json("loi")
    }
    
}