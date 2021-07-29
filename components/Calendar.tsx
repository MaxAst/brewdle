import { useEffect, useState, useCallback } from "react";
import { useCreateActivityContext } from "../context/CreateActivityContext";
import { isPast } from "date-fns";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({
  today = new Date(),
}: {
  today?: Date;
}): JSX.Element {
  const { dates, setDates } = useCreateActivityContext();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [blankDays, setBlankDays] = useState<number[]>();
  const [numberOfDays, setNumberOfDays] = useState<number[]>();

  const getNoOfDays = useCallback(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(year, month).getDay();

    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setBlankDays(blankdaysArray);
    setNumberOfDays(daysArray);
  }, [month, year]);

  // when the month changes, we have to calculate no. 1 of (blank-) days
  useEffect(() => {
    getNoOfDays();
  }, [month, getNoOfDays]);

  const addOrRemoveFromSelectedDates = (dateInput: number) => {
    const date = new Date(year, month, dateInput).toDateString();
    if (dates && dates.includes(date)) {
      setDates(dates.filter((d) => d !== date));
    } else {
      setDates((dates) => (dates ? [...dates, date] : [date]));
    }
  };

  const colorSelectedDay = (dateInput: number) => {
    const givenDate = new Date(year, month, dateInput);
    if (dates?.includes(givenDate.toDateString())) {
      return "bg-blue-500 text-white";
    } else {
      return "text-gray-700 hover:bg-blue-200";
    }
  };

  const handleMonthChange = (direction: "previous" | "next") => {
    if (direction === "previous") {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else if (direction === "next") {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-2 sm:p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="font-bold text-gray-800 text-3xl sm:text-6xl">
            {MONTH_NAMES[month]}
          </span>
          <span className="ml-1 text-gray-600 font-normal text-3xl sm:text-6xl">
            {year}
          </span>
        </div>
        <div>
          <button
            type="button"
            className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-2 rounded-full disabled:hover:bg-white disabled:cursor-not-allowed"
            onClick={() => {
              handleMonthChange("previous");
            }}
            disabled={isPast(new Date(year, month, 1))}
            data-cy="previous-month"
          >
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 inline-flex"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-2 rounded-full"
            onClick={() => {
              handleMonthChange("next");
            }}
            data-cy="next-month"
          >
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 inline-flex"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap mb-3 -mx-1">
        {DAYS.map((day, i) => (
          <div key={i} className="px-1" style={{ width: `${100 / 7}%` }}>
            <div className="text-gray-800 font-medium text-center text-sm">
              {day}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap -mx-1">
        {blankDays?.map((_, i) => (
          <div
            key={i}
            className="text-center border border-transparent text-sm"
            style={{ width: `${100 / 7}%` }}
          />
        ))}

        {numberOfDays?.map((date, i) => (
          <div key={i} className="mb-1" style={{ width: `${100 / 7}%` }}>
            <button
              className={`h-10 w-10 sm:h-12 sm:w-12 mx-auto flex items-center justify-center cursor-pointer text-center text-sm rounded-full transition ease-in-out duration-100 ${colorSelectedDay(
                date
              )} disabled:bg-white disabled:text-gray-300 disabled:cursor-not-allowed`}
              onClick={() => addOrRemoveFromSelectedDates(date)}
              onKeyPress={() => addOrRemoveFromSelectedDates(date)}
              disabled={isPast(new Date(year, month, date))}
              tabIndex={0}
              role="button"
              data-cy={date}
            >
              {date}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
