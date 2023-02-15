const https = require('https');


const getMemes = async (req, res) => {
    const url = 'https://api.imgflip.com/get_memes';

    const request = https.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
    
        response.on('end', () => {
            res.json(JSON.parse(data).data.memes);
        });
    })

    request.on('error', (error) => {
        console.log('An error', error);
    });
    
    request.end()
}

const getTodos  = async (req, res) => {
    let url = 'https://jsonplaceholder.typicode.com/todos';
    
  //if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
    url = !req?.params?.id ? url : url+'/'+ req.params.id;
    console.log(url + '  ' + !req?.params?.id );

    const request = https.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
    
        response.on('end', () => {
            //const body = JSON.parse(data);
            //console.log(body);
            res.json(JSON.parse(data));
        });
    })

    request.on('error', (error) => {
        console.log('An error', error);
    });

    request.end()
}

module.exports = {
    getMemes,
    getTodos
}