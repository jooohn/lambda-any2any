# lambda-any2any

AWS Lambda function to convert file type of files uploaded to S3, using [cloudconvert](https://cloudconvert.com/).

## Installation

```
yarn
```

## How to use

Create `map.js` to convert file.

```javascript
module.exports = {
  mp3: {
    // "outputformat" is required.
    outputformat: 'wav',

    // other params respects https://cloudconvert.com/api/conversions#start.
    converteroptions: {
      audio_bitrate: 128
    }
  }
};
```

Create `zip` including `index.js`, `map.js` and `node_modules/`.

Upload created zip as AWS Lambda function with these env vars, set trigger of S3 object creation for target bucket.

key | description
--- | ---
CLOUDCONVERT_API_KEY | API key for [cloudconvert](https://cloudconvert.com/).
AWS_S3_REGION | Region for AWS S3
AWS_S3_ACCESS_KEY_ID | Access key ID for AWS S3 with PUT/GET permission of target bucket.
AWS_S3_SECRET_ACCESS_KEY | Secret access key corresponding to AWS_S3_ACCESS_KEY_ID.

## Test at local machine

```sh
yarn run local <bucket> <key>
# ex. yarn run local mybucket path/to/my-audio.mp3
```
