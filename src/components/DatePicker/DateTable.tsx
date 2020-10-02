import React, { useState, useEffect } from 'react';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import Utils, { months } from '../../utils/Utils';

interface IProps {
    clicked: boolean;
    setClicked: React.Dispatch<React.SetStateAction<boolean>>;
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    setToBeCompleted: React.Dispatch<React.SetStateAction<string>>;
}

enum WeekDays {
    Mån,
    Tis,
    Ons,
    Tors,
    Fre,
    Lör,
    Sön
}

const utils = new Utils();

const DateTable = ({ clicked, setClicked, date, setDate, setToBeCompleted }: IProps) => {
    const [numOfDays, setNumOfDays] = useState(utils.getNumOfDaysInMonth(date));
    const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());

    const decrementMonth = (): void => {
        date.setMonth(date.getMonth() - 1);
        setNumOfDays(utils.getNumOfDaysInMonth(date));
        setCurrentMonth(date.getMonth());
    }

    const incrementMonth = (): void => {
        date.setMonth(date.getMonth() + 1);
        setNumOfDays(utils.getNumOfDaysInMonth(date));
        setCurrentMonth(date.getMonth());
    }

    const handleChange = (e: any, curDay : number): void => {
        date.setDate(e.target.dataset.value);
        setDate(date);
        setToBeCompleted(utils.formatDate(date));
        setClicked(!clicked);
    }

    const inEffectiveStuff : number[][] = utils.createDayTable(date, numOfDays);

    return (
        <div className="date-table">
            <div className="date-table-nav">
                <div className="left">
                    <IoIosArrowBack className="arrow-push-left" onClick={decrementMonth} />
                </div>
                <div className="centre-header">
                    <h3>{`${utils.capitalize(months[date.getMonth()])} ${date.getFullYear()}`}</h3>
                </div>
                
                <div className="right">
                    <IoIosArrowForward className="arrow-push-right" onClick={incrementMonth} />
                </div>
                
            </div>
            <div className="day-picker">
                <table className="select-days">
                    <thead>
                        <tr>
                            {
                                [...Array(7)].map((_, i: number) => {

                                    return <th className={'datepicker-th'} key={i}>{WeekDays[i]}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inEffectiveStuff.map((row : number[], i : number) => {
                                return <tr key={i + Math.random()}>
                                    {                                        
                                        row.map((data: number, j: number) => {
                                           if (i === 0 && data > 7) {
                                                return <td key={i + Math.random()} className="data-cell">{data}</td>
                                           }
                                           if (i >= 4 && data < 10) {
                                                return <td key={i + Math.random()} className="data-cell">{data}</td>
                                           }
                                            return <td key={i + Math.random()}
                                                        data-value={data}
                                                        className={"data-cell filled-cell"}
                                                        onClick={(e)=> handleChange(e, data)}
                                            >
                                                {data}
                                            </td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* <button onClick={() => setClicked(!clicked)}>Välj datum</button> */}
        </div>
    )
}

export default DateTable;
