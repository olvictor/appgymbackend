const aws = require('aws-sdk');
require('dotenv').config()

const BUCKET_ENDPOINT = new aws.Endpoint(process.env.BUCKET_ENDPOINT)

const s3  = new aws.S3({
    endpoint : BUCKET_ENDPOINT,
    credentials :{
        accessKeyId : process.env.BUCKET_KEY_ID,
        secretAccessKey : process.env.BUCKET_APP_KEY
    }
})


module.exports = s3
