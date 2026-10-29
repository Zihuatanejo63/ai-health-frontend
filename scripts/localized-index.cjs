// Next static export emits /zh.html while /zh/ is a real directory containing child pages.
// Give each language directory an index without changing English URLs or router behavior.
const fs=require('node:fs'),path=require('node:path');
for(const locale of ['zh','es','hi','ar','pt','fr','ru','ja','de']){
 const src=path.join('out',locale+'.html'),dest=path.join('out',locale,'index.html');
 if(!fs.existsSync(src))throw Error('Missing static locale root: '+locale);
 fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);
}
console.log('PASS: nine locale directory index files created.');
