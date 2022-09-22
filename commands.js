const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType ,
	jidDecode
} = require('@adiwajshing/baileys')


const config = require('./config');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const { exec } = require('child_process')
const { sms } = require('./lib/message');
const { imageToWebp, videoToWebp, writeExif } = require('./lib/stic')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep } = require('./lib/functions')
const fs = require('fs');
const ownerNumber = ['94701629707']
const prefix = '.'
const axios = require('axios');
const { yt720 ,  yt480 ,  yt360 } = require('./lib/ytmp4');
const ytmp3 = require('./lib/ytmp3');
const apk_link = require('./lib/playstore');
const { xnxxSearch, xnxxDown, xvideosSearch, xvideosDown } = require('./lib/xnxxdl')

const yts = require( 'yt-search' )


async function ytinfo(name) {

         let arama = await yts(name);
        arama = arama.all;
        if(arama.length < 1) { 
        let result = { status : false} 
        return result 
         } 
        else {
        let thumbnail = arama[0].thumbnail;
        let title = arama[0].title.replace(/ /gi, '+');
        let title2 = arama[0].title
        let views = arama[0].views;
        let author = arama[0].author.name;
        let url = arama[0].url
        let result = { msg : '╔══[🐶𝙱𝙾𝙱𝙸𝚉 𝙱𝙾𝚃🐕]══╗\n╠  *📥YT DOWNLOADER📤*  ╣\n╚═════════════╝\n\n║📽️ɴᴀᴍᴇ: ' + title2 + '\n\n║👁️ᴠɪᴇᴡs: ' + views + '\n\n║📹 ᴄʜᴀɴɴᴇʟ: ' + author + '\n\n║🖇️ᴜʀʟ: ' + url + '\n\n╚═══════════◈' , 
                      thumbnail : thumbnail ,
                      yuturl: url }
        return result
 
        }
}


async function cmd(conn , mek ) {

try {
  
mek = mek.messages[0]
			if (!mek.message) return
			
			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			
			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : ( type == 'listResponseMessage') && mek.message.listResponseMessage.singleSelectReply.selectedRowId? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId  ? mek.message.buttonsResponseMessage.selectedButtonId  : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId  :  (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
			
			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
			
			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'unknown'
			
			const isMe = botNumber.includes(senderNumber)
			const isOwner = ownerNumber.includes(senderNumber) || isMe
      
      
      switch (command) {
      
		    // alive //  
		      
      case 'alive': {
		conn.sendMessage(from , { text: 'I am Online Now' }, { quoted: mek } )
         } 
        break
		      
		case 'porn' : 
		   try {
			if (!q) return await conn.sendMessage(from , { text: 'need keyword' }, { quoted: mek } )   
			const buttons = [
{buttonId: prefix +'xnxx ' + q, buttonText: {displayText: 'From xnxx.com'}, type: 1},
{buttonId: prefix +'xvideos ' + q, buttonText: {displayText: 'From Xvideos.com'}, type: 1},
]
			await conn.sendMessage(from, { image: {url: 'https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX8142847.jpg'  }, caption: 'මොන Website එකෙන්ද ඕනි' , footer: config.FOOTER , buttons: buttons , headerType: 4} , { quoted: mek } )	
			   
		   } 
		      catch(e) {
		      await conn.sendMessage(from , { text: 'error\n\n' + e }, { quoted: mek } )
		      }
		break       

	case 'xnxx': 
		   try {
	      if (!q) return await conn.sendMessage(from , { text: 'Type a keyword  ex : .xnxx japanese' }, { quoted: mek } ) 
	       const data = await xnxxSearch(q)
	       
		     if (data.length < 1) return await  conn.sendMessage(from, { text: e2Lang.N_FOUND }, { quoted: mek } )
	  var srh = [];  
		   for (var i = 0; i < data.length; i++) {
      srh.push({
          title: data[i].title,
          description: data[i].duration + data[i].quality,
          rowId: prefix + 'dxnxx ' + data[i].link
      });
  }
    const sections = [{
      title: "Our Porn Store",
      rows: srh
  }]
    const listMessage = {
      text: " \n Input : " + q + '\n ',
      footer: config.FOOTER,
      title: 'Please Select What do you want',
      buttonText: "Results",
      sections
  }
    await conn.sendMessage(from, listMessage, {quoted: mek })
		      } catch(e) {
await conn.sendMessage(from , { text: 'error' }, { quoted: mek } )  
} 
		      
 break
		      
 //_______________________________________________________________________________________________________________________________________________________   //		      
	// dporn // 
	
	case 'dxnxx' :
	      try {
	     if(!q) return await conn.sendMessage(from , { text: 'need link' }, { quoted: mek } )      
	     
              const data = await xnxxDown(q)      
const waladown = await conn.sendMessage(from , { text: config.VIDEO_DOWN }, { quoted: mek } )
await conn.sendMessage(from, { delete: waladown.key })
const walaup = await conn.sendMessage(from , { text: config.VIDEO_UP }, { quoted: mek } )
await conn.sendMessage(from ,{ video: { url : data.url } , caption: config.CAPTION } , { quoted: mek })
await conn.sendMessage(from, { delete: walaup.key })
		      
	      } catch(e) {
		await conn.sendMessage(from , { text: 'error' }, { quoted: mek } )      
	      }      
	      break  
		     
		
	case 'xvideos': 
		   try {
	      if (!q) return await conn.sendMessage(from , { text: 'Type a keyword  ex : .xvideos japanese' }, { quoted: mek } ) 
	       const data = await xvideosSearch(q)
	       
		     if (data.length < 1) return await  conn.sendMessage(from, { text: e2Lang.N_FOUND }, { quoted: mek } )
	  var srh = [];  
		   for (var i = 0; i < data.length; i++) {
      srh.push({
          title: data[i].title,
          description: data[i].duration + data[i].quality,
          rowId: prefix + 'dxvideos ' + data[i].url
      });
  }
    const sections = [{
      title: "Our Porn Store",
      rows: srh
  }]
    const listMessage = {
      text: " \n Input : " + q + '\n ',
      footer: config.FOOTER,
      title: 'Please Select What do you want',
      buttonText: "Results",
      sections
  }
    await conn.sendMessage(from, listMessage, {quoted: mek })
		      } catch(e) {
await conn.sendMessage(from , { text: 'error' }, { quoted: mek } )  
} 
		      
 break
		      
 //_______________________________________________________________________________________________________________________________________________________   //		      
	// dporn // 
	
	case 'dxvideos' :
	      try {
	     if(!q) return await conn.sendMessage(from , { text: 'need link' }, { quoted: mek } )      
	     
              const data = await xvideosDown(q)      
const waladown = await conn.sendMessage(from , { text: config.VIDEO_DOWN }, { quoted: mek } )
await conn.sendMessage(from, { delete: waladown.key })
const walaup = await conn.sendMessage(from , { text: config.VIDEO_UP }, { quoted: mek } )
await conn.sendMessage(from ,{ video: { url : data.url } , caption: config.CAPTION } , { quoted: mek })
await conn.sendMessage(from, { delete: walaup.key })
		      
	      } catch(e) {
		await conn.sendMessage(from , { text: 'error' }, { quoted: mek } )      
	      }      
	      break  
	       

      }

}catch(e) {
const isError = String(e)
console.log( isError )
}


}

module.exports = cmd
	
