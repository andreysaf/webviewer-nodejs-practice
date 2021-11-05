const express = require('express')
const { PDFNet } = require('@pdftron/pdfnet-node');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3001

app.use(cors())
app.use(express.static('public'))


app.get('/list-files', (req, res) => {
  // I want to read the directory
  const filePath = path.resolve(__dirname, './public/files/');
  fs.readdir(filePath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify(files));
  })
})

app.get('/convert-psd-to-pdf', async (req, res) => {

  const main = async () => {
    const pathToModule = path.resolve(__dirname, './node_modules/@pdftron/pdfnet-node/lib')
    PDFNet.addResourceSearchPath(pathToModule);
    if (!(await PDFNet.AdvancedImagingModule.isModuleAvailable())) 
    {
      console.log("PDFTron SDK Advanced Imaging module not available.");
    }
    const inputPath = path.resolve(__dirname, './public/files/2.psd');
    const saveToPath = path.resolve(__dirname, './public/files/blank.pdf');
    
    const doc = await PDFNet.PDFDoc.create();
    doc.initSecurityHandler();

    const opts = new PDFNet.Convert.AdvancedImagingConvertOptions();
		opts.setDefaultDPI(72);

		await PDFNet.Convert.fromDICOM(doc, inputPath, opts);

    doc.save(saveToPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
  };

  try {
    await PDFNet.runWithCleanup(main, process.env.PDFNET_KEY);
    PDFNet.shutdown();
  } catch (e) {
    console.log('Error: ' + JSON.stringify(error));
  }
  res.send('Conversion succeeded');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})