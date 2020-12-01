const url3 = require('url');
const {ss} = require('./ss');

var urlll = 'https://www.instagram.com/p/CIJdq5PAXof/media/?size=l'
namaFilenya = url3.parse(urlll).hostname
if(namaFilenya === ''){ namaFilenya = urlll.replace('https://','').replace('http://','') }
console.log(namaFilenya)
// Pilih 3 mode
// mode => full => Screenshot full page
// mode => null => Screenshot Tidak Full
// mode => pdf  => Save to pdf
var mode = null

if(mode === ''){ mode = false; };
if(mode === 'full'){ mode = true; };
if(mode === 'pdf'){ mode = 'ya'}

console.log('silahkan tunggu 5 detik');
(async function() {
    await ss(urlll,mode,`log/${namaFilenya}`).then((result) => {
        if(mode === 'pdf'){ 
            return `File terimpan di log/${namaFilenya}.pdf`
        }else{
            return `File terimpan di log/${namaFilenya}.png`
        }
    })
})()