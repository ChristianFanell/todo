import React, {useEffect, useState } from 'react';

import DateTable from './DateTable';
import Utils from '../../utils/Utils';

interface IProps {
    setToBeCompleted: React.Dispatch<React.SetStateAction<string>>;
    passedDate: string | null;
    cssClass: string;

}

const utils = new Utils();

const DatePicker = ({setToBeCompleted, passedDate, cssClass } : IProps) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [date, setDate] = useState(passedDate ? new Date(passedDate) : new Date());
    
    // https://medium.com/@jcbaey/authentication-in-spa-reactjs-and-vuejs-the-right-way-e4a9ac5cd9a3
    useEffect(() => {
        setToBeCompleted(utils.formatDate(date));
    }, [date])

    return (
        <div className="date-picker-container">
            <div className="date-picker-clicker">
                <input className={cssClass} onClick={() => setClicked(!clicked)} type="text" readOnly value={utils.formatDate(date)} />
            </div>
            {
                clicked ? <DateTable 
                            clicked={clicked}
                            setClicked={setClicked}
                            date={date}
                            setDate={setDate}
                            setToBeCompleted={setToBeCompleted}
                            /> : null
            }
        </div>
    )
}

export default DatePicker;
