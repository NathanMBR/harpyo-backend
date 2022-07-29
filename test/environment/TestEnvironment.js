/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require("dotenv");
const NodeEnvironment = require("jest-environment-node");
const { execSync } = require("child_process");
const { Client } = require("pg");

const prismaCLI = "./node_modules/.bin/prisma";
dotenv.config();

class TestEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
        this.schema = `harpyo-test_${Date.now()}`;
        this.connectionString = `${process.env.TEST_DATABASE_URL}${this.schema}`;
    }

    setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;

        process.env.NODE_ENV = "test";
        this.global.process.env.NODE_ENV = "test";

        execSync(`${prismaCLI} migrate dev`);
    }

    async teardown() {
        const client = new Client(
            {
                connectionString: this.connectionString
            }
        );

        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();
    }
}

module.exports = TestEnvironment;