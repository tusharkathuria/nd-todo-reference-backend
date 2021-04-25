import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger';

const logger = createLogger('s3Access');

const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({signatureVersion: "v4"})
const bucketName = process.env.TODOS_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export const getSignedUrl = (todoId: String) => {
    logger.info(`Getting signed url for putting object with id ${todoId}`)

    const url = s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId,
        Expires: parseInt(urlExpiration)
    })

    logger.info(`Successfully genertated signed url for putting object with id ${todoId}`)

    return url
}