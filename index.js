const cheerio = require("cheerio");
const {getPage} = require("./request");
const keyWord = "微信";

const findText =  async function(url){
    const page = await getPage(url);
    const $ = cheerio.load(page,{decodeEntities: false});
    // console.log(page);
    let list = $('div[class=tag_text]');

    // console.log(list.html());
    // for(let i = 0; i < list.length; i++){
    //     console.log(list[i]);
    // }

    let data = [];
    for(let i = 0; i < list.length; i++){
        let one = $(list[i]).html();
        if(one.indexOf(keyWord) !== -1){
            data.push(one);
        }
    }

    let page_next_href = $('a[class=page_next]').attr('href');
    console.log("#######", page_next_href);
    return data;
};

void async function(){
    const homeUrl = `http://www.chineseinla.com/tag/id_3639/page_`;
    let list = [];
    for(let i = 1; i < 10; i++){
        let url = `${homeUrl}${i}.html`;
        let data = await findText(url);
        list = list.concat(data);
    }
    console.log(list);
}();



