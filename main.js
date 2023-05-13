const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
const JsDiff = require('diff');

const link = "https://www.naver.com/";

const getHtml = async () => {
  try {
    return await axios.get(link);
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    const $ = cheerio.load(html.data);
    const text = $('*').text(); // 파일에 쓸 내용
    const regex = /^https?:\/\/(?:www\.)?([a-z0-9]+(?:\.[a-z0-9]+)*\.[a-z]{2,})/;
    const domainName = link.match(regex)[1];

    if(!fs.existsSync(`/tmp/${domainName}.txt`)) { // 만일 tmp 폴더에 파일이 존재하지 않으면
      fs.writeFileSync(`/tmp/${domainName}.txt`, text); // 파일 쓰기
      console.log('파일 쓰기 완료 !!!');
    } else {
      const read = fs.readFileSync(`/tmp/${domainName}.txt`); // 파일 읽기
      const diff = JsDiff.diffWords(read.toString(), text);
      diff.forEach((part) => {
        if (part.added || part.removed) {
          console.log(part);
        }
      });
    }
  })
