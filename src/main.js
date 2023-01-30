import getSpeedInfo from "./libs/xdsl-lib.js";

import inquirer from 'inquirer';
import { table } from 'table';
import figlet from "figlet";
import chalk from "chalk";

function printData(data) {
    const TableData = [
        ['XDSL Data', '', '', '', ''],
        ['Phone Number', 'Download Speed', 'Upload Speed', 'Max Download Speed', 'Max Upload Speed'],
        [data.TelNo, data.Down, data.Up, data.MaxDown, data.MaxUp]
    ];
    const TableConfig = {
        columns: [
          { alignment: 'center' },
          { alignment: 'center' },
          { alignment: 'center' },
          { alignment: 'center' },
          { alignment: 'center' },
        ],
        spanningCells: [
            { col: 0, row: 0, colSpan: 5 },
        ],
      };
      console.log(table(TableData, TableConfig));
      console.log(data.Date)
}

export default async function welcome() {
    console.log("Welcome to XDSL CLI")
    console.log("For help, type help")
}

export async function getSpeed(telno) {
    if (!telno) {
        const questions = [
            {
                name: 'telno',
                type: 'input',
                message: 'Enter your phone number:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your phone number.';
                    }
                }
            }
        ];
        const answers = await inquirer.prompt(questions);
        const data = await getSpeedInfo(answers.telno);
        printData(data);
    } else {
        const data = await getSpeedInfo(telno);
        printData(data);
    }
}
