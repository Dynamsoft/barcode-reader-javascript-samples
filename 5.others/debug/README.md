# Collect runtime images for debugging

When you encounter unreadable barcodes via a video input, you can use this sample to take a few sample frames to share with the Dynamsoft Support Team for debugging purposes.

Since the video is usually playing on mobile devices, having these frames uploaded to a self-hosted local server is most convenient, the following shows how to use the sample.

## Set up a local server

We make use of the web server that comes with [Express](https://expressjs.com/).

### Install Express

Run the following script to install Express.

`npm install`

### Start the server

We defined the web server logic in the file "app.js", to start it, run the following script:

`node app.js`

Note that we have enabled SSL on this server at the port 4443.

## Use the sample page

Once the server is up and running, open the page on the device that will do the barcode reading. The URL for the sample is "https://{your-local-ip}:4443/". For example, suppose your ip is 192.168.1.1, the site can be visited at https://192.168.1.1:4443/.

> Note that the device should be in the same WiFi network as the server machine.

Click the button "show scanner" and try to read barcodes as you normally do, the frames will then be uploaded to the folder "debug\public\collect" as images (.png) on the server. When you have collected enough frames, don't forget to turn off the scanner, otherwise, new frames will continue to flood in.

Check the images to make sure that they correctly represent the actual usage scenario, then zip and send them to Dynamsoft for technical assistance.
