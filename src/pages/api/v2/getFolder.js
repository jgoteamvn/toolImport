import fs from 'fs.promises'
import _ from "lodash"
export default async function handler(req, res) {
    const folders = await fs.readdir(req.body.folderName)
    let result = _.remove(folders, function(n) {
        return n != ".DS_Store";
    });
    res.status(200).json(result);
}
  