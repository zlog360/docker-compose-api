// import { inflateRawSync } from 'zlib';

// const logger = require('debug')('docker-compose:formatter');

let regex_map: any = {
    'docker-compose': /[0-9]{1,}.[0-9]{1,}.[0-9]{1,}/g,
    'docker-py': /[0-9]{1,}.[0-9]{1,}.[0-9]{1,}/g,
    'CPython': /[0-9]{1,}.[0-9]{1,}.[0-9]{1,}/g,
    'OpenSSL': /[0-9]{1,}.[0-9]{1,}.[0-9]{1,}/g,
    'build': 'unknown'
}

export class Formatter {
    static json(data: any): any {
        let temp: any = {};
        const rmap = Object.keys(regex_map);
        rmap.forEach((key: string) => {
            const regex = regex_map[key];
            data.split('\n').map((itr: any) => {
                const nkey = itr.match(key);
                const match = itr.match(regex)
                if (nkey && match)
                 temp[nkey] = match[0];
            })
        })
        return temp;
        // const tempArr = lines.map((itr: any) => { 
        //    const map = Object.keys(regex_map); 
        //    return map.forEach((key: string) => {
        //        const tmpItr = itr;
        //            const regex = regex_map[key];
        //            const nkey = itr.match(key);
        //            const match = itr.match(regex)
        //            console.log('match -----> ', match);
        //            if (match)
        //              temp[nkey] = match[0];
        //            return { [nkey]: match };
        //    }) 
        // });
        // return tempArr;
    }
}
