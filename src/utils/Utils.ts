import { start } from "repl";

export default class Utils {
    /**
     *
     */
    constructor() {

    }

    createDayTable = (date : Date, numOfDays : number) => {
        let rows = 6;
        let startIndex = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`).getDay();
        let dataArray: any[] = [];
        let dayIndex = 1
        let nextMonthDays = 1;
        let nullcounter = 0;

        // sunday = 0 :S
        startIndex = (startIndex === 0) ? 7 : startIndex;

        for (let i = 0; i < rows; i++) {
            let weeks = [];

            for (let j = 0; j < 7; j++) {
                if (j + 1 < startIndex && i === 0) {
                    weeks.push(null);
                    nullcounter++;
                }
                else if (dayIndex <= numOfDays) {
                    weeks.push(dayIndex);
                    dayIndex++;
                }
                else {
                    weeks.push(nextMonthDays);
                    nextMonthDays++;                                      
                }                
            }
            if (nextMonthDays > 7) break;
            dataArray.push(weeks);
        }
        return this.fillNullinDate(dataArray, nullcounter, date);
    }

    fillNullinDate(array : any, index : number, date : Date) {
        let previousMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
        let startIndex = previousMonthDays - index + 1;

        for (let i = 0; i < index; i++) {
            if (array[0][i] === null) {
                array[0][i] = startIndex;
                startIndex++;
            }
        }
        return array;
    }

    capitalize(name : string) : string {
        return name[0].toUpperCase() + name.slice(1);
    }

    getNumOfDaysInMonth= (date : Date)  : number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    formatDate = (d : Date) : string => {
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let monthString = month + 1 < 10 ? `0${month+1}` : month + 1;
        let dayString = day < 10 ? `0${day}` : day;

        return `${year}-${monthString}-${dayString}`;
    }
}

interface IMonth {
    [key: number] : string;
}

export const months : IMonth = {
    0: 'januari',
    1: 'februari',
    2: 'mars',
    3: 'april',
    4: 'maj',
    5: 'juni',
    6: 'juli',
    7: 'augusti',
    8: 'september',
    9: 'oktober',
    10: 'november',
    11: 'december'
}

    