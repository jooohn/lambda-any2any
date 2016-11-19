'use strict';

console.log('Loading function');
const path = require('path');
const cloudconvertApiKey = process.env.CLOUDCONVERT_API_KEY;
const cloundconvert = new (require('cloudconvert'))(cloudconvertApiKey);

const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const convertMap = require('./map');
exports.handler = (event, context, callback) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const parsed = path.parse(key);
    const inputformat = parsed.ext.replace(/^\./, '');
    const options = convertMap[inputformat];
    if (options) {
      const outputformat = options.outputformat;
      const targetKey = [parsed.dir, `/${parsed.name}`, `.${outputformat}`].join('');
      const s3Payload = {
        region: region,
        accesskeyid: accessKeyId,
        secretaccesskey: secretAccessKey,
        bucket: bucket
      };
      const payload = Object.assign(options, {
        input: {
          s3: s3Payload
        },
        file: key,
        output: {
          s3: Object.assign({
            path: targetKey
          }, s3Payload)
        }
      });
      cloundconvert.createProcess({
        inputformat: inputformat,
        outputformat: outputformat
      }, function (err, process) {
        if (err) {
          console.error(err);
        } else {
          process.start(payload);
        }
      });
    } else {
      console.log(`${inputformat} for ${key} is not supported.`);
    }
};
