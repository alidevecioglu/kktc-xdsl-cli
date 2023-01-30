/* 
    Node.js library for fetching speed information from Northern Cyprus Telekom's page, they don't have an API so I had to use request and cheerio to fetch the data.
    They didn't use any ID tags in the HTML, so I had to use the h6 tags to fetch the data.
    I'm not sure if this is the best way to do it, but it works 😅.
*/

import request from 'request';
import { load } from 'cheerio';
var url = 'https://xdsl.telekom.gov.ct.tr/sorgu/sonuc.php?telno=';

export default function getSpeedInfo(telno) {
    return new Promise((resolve, reject) => {
        request(url + telno, (error, _response, body) => {
            if (error) {
                reject(error);
            } else {
                const $ = load(body);
                const h6 = $('h6').map((_i, el) => $(el).text()).get();
                var data = {
                    "TelNo": telno,
                    "Down": h6[0],
                    "Up": h6[1],
                    "MaxDown": h6[2],
                    "MaxUp": h6[3],
                    "Date": Date()
                };
                resolve(data);
            }
        });
    });
}


