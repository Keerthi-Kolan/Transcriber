/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_S313901467_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");

const s3 = new AWS.S3();
const transcribe = new AWS.TranscribeService({
  region: "us-west-2",
});

const BUCKET_NAME = "transcribeaudiofaba1-dev"; // input bucket
const PREFIX = "protected/us-west-2:97bcc019-0b3f-c4b7-5699-db554c6951ac/"; // folder path
exports.handler = async (event) => {
  try {
    // List all audio files in protected/xyz/
    const listResult = await s3
      .listObjectsV2({
        Bucket: BUCKET_NAME,
        Prefix: PREFIX,
      })
      .promise();

    const audioFiles = listResult.Contents.filter(
      (obj) =>
        obj.Key.endsWith(".mp3") ||
        obj.Key.endsWith(".wav") ||
        obj.Key.endsWith(".flac")
    );

    if (audioFiles.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify("No audio files found."),
      };
    }

    // Find the most recently uploaded file
    const latestFile = audioFiles.reduce((a, b) =>
      new Date(a.LastModified) > new Date(b.LastModified) ? a : b
    );

    const mediaUri = `s3://${BUCKET_NAME}/${latestFile.Key}`;
    const jobName = `transcription_${Date.now()}`;
    const mediaFormat = latestFile.Key.endsWith(".wav") ? "wav" : "mp3"; // crude guess

    await transcribe
      .startTranscriptionJob({
        TranscriptionJobName: jobName,
        Media: { MediaFileUri: mediaUri },
        MediaFormat: mediaFormat,
        LanguageCode: "en-US",
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(
        `Started transcription job: ${jobName} for file ${latestFile.Key}`
      ),
    };
  } catch (err) {
    console.error("Error starting transcription job:", err);
    return {
      statusCode: 500,
      body: JSON.stringify(`Error: ${err.message}`),
    };
  }
};
