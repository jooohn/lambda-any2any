const index = require('./index');
const bucket = process.argv[2];
const key = process.argv[3];
if (!bucket || !key) {
  console.error('Usage: yarn local <bucket> <key>');
  process.exit(1);
} else {
  const payload = {
    "Records": [
    {
      "s3": {
        "bucket": {
          "name": bucket
        },
        "object": {
          "key": key
        }
      }
    }
    ]
  };
  index.handler(payload);
}
