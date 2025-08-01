
# SCALABLE MEDIA TRANSCRIPTION SYSTEM WITH SERVERLESS CLOUD ARCHITECTURE

A full-stack React + AWS Amplify application that enables authenticated users to upload audio files and receive real-time transcriptions using Amazon Transcribe.

---

## Features

- Secure user authentication using AWS Cognito
- Audio file uploads to Amazon S3 via Amplify Storage
- Transcription jobs triggered via API Gateway → Lambda → Amazon Transcribe
- Real-time transcript fetch and display in UI
- Modular React app with Amplify integration

---

## Tech Stack

### Frontend
- React
- AWS Amplify (Auth, Storage, API)
- React Hooks

### Backend
- AWS Lambda
- Amazon API Gateway
- Amazon Transcribe
- Amazon S3
- AWS Cognito

---

## Installation & Setup

### Prerequisites
- Node.js v16+
- AWS CLI (configured)
- Amplify CLI

### Setup Instructions

```bash
# Install Amplify CLI if not already installed
npm install -g @aws-amplify/cli

# Clone the repository
git clone https://github.com/Keerthi-Kolan/Transcriber.git

# Install frontend dependencies
npm install

# Initialize Amplify
amplify init

# Add backend resources
amplify add auth
amplify add storage
amplify add function
amplify add api

# Deploy to AWS
amplify push
```

---

## Usage

1. Run your React app:
   ```bash
   npm start
   ```

2. Sign up / log in using Cognito Auth
3. Upload an audio file (`.mp3`, `.wav`, `.flac`)
4. Click **Transcribe**
5. The transcript will appear under the audio player once the job is complete

---

## System Architecture

```
[User] → [React Frontend (Amplify)]
           ├──> [Amplify Auth (Cognito)] – for login/signup
           ├──> [Amplify Storage (S3)] – to upload audio
           ├──> [Amplify API (API Gateway)] – to trigger backend
                   └──> [Lambda Function (startTranscription)]
                            ├──> [Amazon Transcribe] – converts audio to text
           └──> [Transcript Response] – shown in frontend
```

---

## Project Highlights

- Built with 6 AWS services
- Real-time speech-to-text conversion
- Fully serverless and scalable
- 100% authenticated access for all features

---

## Security

- User authentication handled by Cognito
- Audio files stored with `protected` access in S3
- CORS properly configured on API Gateway
- IAM roles restrict access to Lambda and storage

---


## Acknowledgments

Thanks to:
- [AWS Amplify Docs](https://docs.amplify.aws)
- [Amazon Transcribe Docs](https://docs.aws.amazon.com/transcribe/)
- [React](https://reactjs.org)
