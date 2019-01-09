const cheerio = require("cheerio");
const {getPage} = require("./request");
const keyWord = "微信";

const findText =  async function(url){
    const page = await getPage(url);                            //获得页面
    const $ = cheerio.load(page,{decodeEntities: false});       //decodeEntities: false 解决中文乱码问题
    let list = $('div[class=tag_text]');                        //获得所有class为tag_tex的div块。但list.html()只有第一个

    let data = [];
    for(let i = 0; i < list.length; i++){                       //遍历list
        let one = $(list[i]).html();                            //这里必须用$(list[i])
        if(one.indexOf(keyWord) !== -1){
            data.push(one);
        }
    }

    let page_next_href = $('a[class=page_next]').attr('href');  //attr可以获得<a>的href属性

    //TODO: 通过page_next_href进行下一页的访问，而不是通过`${homeUrl}${i}.html`去获得下一页
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



