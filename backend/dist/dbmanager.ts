import { Pool } from "pg"
import { CustomError } from './models/utils/customError'

export default class DbManager {

    // Custom Error variable to translate db unsuccesfull query results into errors
    private error: CustomError = new CustomError('', '')

    // check if the parameters array is correct

    private checkParams(params: any[], sql:string): boolean {
        for (let element of params) {
            if (element == null) {
                this.error.name = "PARAMS ERROR"
                this.error.details = ("important parameter is null or misspelled")
                console.log(sql)
                console.log(params)
                console.log(this.error)
                return false
            }
        }
        return true
    }


    /*
    * connect to the database for a GET query
    */
    public async getQuery(sql: string, params: any[]): Promise<any> {

        // check that parameters are not null
        if (!(this.checkParams(params,sql))) { return this.error }

        // create new clients pool
        let pool = new Pool()
        let client = await pool.connect()
        try {
            let result = await client.query(sql, params)
            // if data was found on the database
            if (result.rowCount > 0) {
                console.log('\nResult: ', result.rows, '\n')
                return result
            }
            // if data was not found on the database
            else {
                this.error.name = "DB ERROR"
                this.error.details = "data not found"
                return this.error
            }
        }
        // catch connection error
        catch (err) {
            console.log(sql)
            console.log('getQuery error: ', err)
            return err
        }
        // always realease client and end connection
        finally {
            client.release()
            await pool.end()
        }
    }

    /*
    * connect to the database for a POST query
    */
    public async postQuery(sql: string, params: any[]): Promise<any> {

        // check that parameters are not null
        if (!(this.checkParams(params,sql))) { return this.error }

        // create new clients pool
        let pool = new Pool()
        let client = await pool.connect()
        try {
            let result = await client.query(sql, params)
            return result
        }
        // catch connection error
        catch (err) {
            console.log(sql)
            console.log('postQuery error: ', err)
            return err
        }
        // always realease client and end connection
        finally {
            client.release()
            await pool.end()
        }
    }

    /*
    * connect to the database for a UPDATE query
    */
    public async updateQuery(sql: string, params: any[]): Promise<any> {

        // check that parameters are not null
        if (!(this.checkParams(params,sql))) { return this.error }

        // create new clients pool
        let pool = new Pool()
        let client = await pool.connect()
        try {
            let result = await client.query(sql, params)
            // if data was correctly updated from database
            if (result.rowCount > 0) {
                console.log('element updated')
                return result
            }
            // if an error was encountered
            else {
                this.error.name = "DB ERROR"
                this.error.details = "data not found"
                return this.error
            }
        }
        // catch connection error
        catch (err) {
            console.log(sql)
            console.log('updateQuery error: ', err)
            return err
        }
        // always realease client and end connection
        finally {
            client.release()
            await pool.end()
        }
    }

    /*
    * connect to the database for a DELETE query
    */
    public async deleteQuery(sql: string, params: any[]): Promise<any> {

        // check that parameters are not null
        if (!(this.checkParams(params,sql))) { return this.error }

        // create new clients pool
        let pool = new Pool()
        let client = await pool.connect()
        try {
            let result = await client.query(sql, params)
            // if data was correctly deleted from database
            if (result.rowCount > 0) {
                console.log('element deleted')
                return result
            }
            // if an error was encountered
            else {
                this.error.name = "DB ERROR"
                this.error.details = "data not found"
                return this.error
            }
        }
        // catch connection error
        catch (err) {
            console.log(sql)
            console.log('deleteQuery error: ', err)
            return err
        }
        // always realease client and end connection
        finally {
            client.release()
            await pool.end()
        }
    }
}