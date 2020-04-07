var fs = require('fs');
var yaml = require('js-yaml');
var appRoot = require('app-root-path');
var procDir = './assets/procedures/';
var imageDir = '\\assets\\images\\';

// Function to return list of all procedure files from the filesystem
exports.get_files = function (req, res) {
    var response = [];
    fs.readdirSync(procDir).forEach(file => {
        response.push(file);
    })
    res.status(200).send(response);
}

// Function to validate the format of the provided procedure file
exports.lint_file = function (req, res) {
    var response;
    try {
        response = yaml.safeLoad(fs.readFileSync(procDir + req.params.filename, "utf8"));
    } catch (e) {
        // Handle file not found exception
        if (e.code === 'ENOENT') {
            res.status(404).send({"error": "The selected file does not exist. Please try again."});
        }
        // Handle invalid yaml files
        else {
            res.status(422).send({"error": "The selected procedure file is unreadable. Please ensure the format and file type (.yml) are correct."});
        }
    }
    res.status(200).send(response);
}

exports.get_image = function (req, res) {
    // express sendFile requires absolute path so using app-root-path module to get root and prepending it
    var file = appRoot + imageDir + req.params.filename;
    console.log('Serving image ' + appRoot + imageDir + req.params.filename);
    res.status(200).sendFile(file, function (err) {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).send({"error": "The requested image file does not exist. Please try again."});
            }
        }
    })
}