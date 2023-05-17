[Readme en Español](README(es).md) 

# Clinic Appointment System

This is a basic clinic appointment system project. It allows users to obtain information about available appointments through phone calls using Asterisk ARI. The application utilizes Google Text-to-Speech (TTS) to generate audio messages and SoX to convert the audio files to the format required by Asterisk. Appointment information is stored in a MySQL database.

## Installation

1. Clone the project repository from GitHub:

```
git clone https://github.com/your-username/clinic-appointment-system.git
```

2. Install the dependencies by running the following command in the project folder:

```
npm install
```

3. Ensure that Asterisk is installed and properly configured on your server.

4. Create a MySQL database named 'clinic' and make sure to have the correct credentials in the app.js configuration file.

## Configuration

Before running the application, make sure to configure the following parameters:

1. Update the MySQL connection configuration in the app.js file with the correct credentials (host, user, password).

2. Verify that the audio file path in the app.js file is correct and accessible on your server.

3. Adjust the SQL queries in the app.js file according to the structure of your appointment table in the database.

## Usage

1. Start the application by running the following command:

```
node app.js
```

2. Ensure that Asterisk is up and running and configured to use ARI.

3. Make a call to the extension configured for the appointment system.

4. An audio message with the available appointments will be played. The audio message will be generated using Google TTS and converted to the required Asterisk format (.gsm) using SoX.

## Contributions

This project has been developed as part of an academic course, and we do not accept external contributions. However, if you encounter any errors or issues with the application, you can report them through the issues section in this repository.
