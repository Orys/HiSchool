import { Teacher, User } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../tableManager";

export class TeacherManager extends TableManager {

    public async getTeacher(user: User): Promise<any> {

        this.sql = 'SELECT * FROM Teachers WHERE username = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let teacher = new Teacher(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                this.result.rows[0].subjects
            )
            this.result = teacher
        }
        return this.result
        
    }

    public async postTeacher(req: Request): Promise<any> {

        this.sql = 'INSERT INTO Teachers ( username, subjects ) VALUES ($1,$2)'
        this.params = [
            req.body.username,
            req.body.subjects
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }

}