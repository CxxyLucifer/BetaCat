import pinyin from 'pinyin';

const toPinYin = (chinase: string)=>{
    const pyArr = pinyin(chinase);
    let pyStr = '';
    pyArr.map(element => {
        pyStr += element[0];
    });
    return pyStr;
}


const getFirstLetter = (chinase: string)=>{
    return toPinYin(chinase).substr(0,1).toUpperCase();
}

export default {
    toPinYin,
    getFirstLetter
}