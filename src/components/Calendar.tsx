/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import { atom, useAtom } from "jotai";
import TodoIcon from "./TodoIconSvg";
import "dayjs/locale/ko";
import isoWeek from "dayjs/plugin/isoWeek";

const currentMonthAtom = atom(dayjs());
const selectedDateAtom = atom(dayjs());

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useAtom(currentMonthAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  dayjs.extend(isoWeek);
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("isoWeek");
  const endDate = endOfMonth.endOf("week");

  const days: dayjs.Dayjs[] = [];
  let date = startDate;
  while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
    days.push(date);
    date = date.add(1, "day");
  }

  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <div css={CalendarBox}>
      <div css={CalendarHeader}>
        <span>{currentMonth.format("MMM YYYY")}</span>
        <div css={CalendarBtnBox}>
          <ChevronLeft
            onClick={handlePrevMonth}
            width="18px"
            cursor={"pointer"}
          />
          <ChevronRight
            onClick={handleNextMonth}
            width="18px"
            cursor={"pointer"}
          />
        </div>
      </div>
      <div css={CalendarGrid}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div css={DayHeader} key={d}>
            {d}
          </div>
        ))}
        {days.map((day) => {
          const isCurrentMonth = day.month() === currentMonth.month();
          const isToday = day.isSame(dayjs(), "day");
          const isSelected = selectedDate?.isSame(day, "day");

          if (!isCurrentMonth) return <div key={day.toString()}></div>;

          return (
            <div
              key={day.toString()}
              css={[DayCell, isToday && TodayCell]}
              onClick={() => setSelectedDate(day)}
            >
              <TodoIcon />
              {isSelected ? (
                <div css={SelectedDate}>{day.date()}</div>
              ) : (
                <div>{day.date()}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SelectedDate = css`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: white;
  color: black;
`;

const CalendarBox = css`
  width: 350px;
  padding: 10px;
  color: white;
`;

const CalendarHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CalendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
`;
const CalendarBtnBox = css`
  display: flex;
  gap: 10px;
`;
const DayHeader = css`
  font-weight: bold;
  font-size: 12px;
`;

const DayCell = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
`;

const TodayCell = css`
  color: #fff;
  font-weight: bold;
`;

export default Calendar;
