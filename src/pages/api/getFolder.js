import { rootDir } from '@/components/new/const';
import fs from 'fs.promises'

export default async function handler(req, res) {

    const folders = await fs.readdir(rootDir)

    res.status(200).json(folders);
}
  