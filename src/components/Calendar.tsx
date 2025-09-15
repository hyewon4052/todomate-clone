/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChevronLeft, ChevronRight, BadgeCheck, Check } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import { useAtom, useAtomValue } from "jotai";
import TodoIcon from "./TodoIconSvg";
import "dayjs/locale/ko";
import { currentMonthAtom, selectedDateAtom } from "../store/calendar/atoms";
import { daysCalendarAtom } from "../store/calendar/selectors";
import { monthDoneAtom, todoListAtom } from "../store/todo/atoms";
import { categories } from "./Todolist";
import { useCallback } from "react";

const weeks = Object.freeze(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useAtom(currentMonthAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const monthDone = useAtomValue(monthDoneAtom);
  const todoList = useAtomValue(todoListAtom);
  const days = useAtomValue(daysCalendarAtom);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
    setSelectedDate((prev) => prev.subtract(1, "month").startOf("month"));
  }, [setCurrentMonth, setSelectedDate]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.add(1, "month"));
    setSelectedDate((prev) => prev.add(1, "month").startOf("month"));
  }, [setCurrentMonth, setSelectedDate]);

  const getCompletedCategories = useCallback(
    (day: Dayjs) => {
      const completedCategories: string[] = [];

      todoList
        .filter((todo) => dayjs(todo.date).isSame(day, "day") && todo.isdone)
        .sort((a, b) => a.categoryId - b.categoryId)
        .forEach((todo) => {
          const category = categories.find((c) => c.id === todo.categoryId);
          if (
            category &&
            !completedCategories.includes(`var(${category.color})`)
          ) {
            completedCategories.push(`var(${category.color})`);
          }
        });

      return [...completedCategories];
    },
    [todoList]
  );

  const getDayNotDoneCount = useCallback(
    (day: Dayjs) =>
      todoList.filter(
        (todo) => dayjs(todo.date).isSame(day, "day") && !todo.isdone
      ).length,
    [todoList]
  );

  const getDayColor = (day: Dayjs) => {
    const now = day.day();
    if (now === 0) return "red";
    if (now === 6) return "blue";
    return "white";
  };

  return (
    <div css={CalendarBox}>
      <div css={CalendarHeader}>
        <div css={CalendarDateBox}>
          <span>{currentMonth.format("MMM YYYY")}</span>
          <div css={CountBox}>
            <BadgeCheck width="16px" />
            <span>{monthDone}</span>
          </div>
        </div>
        <div css={CalendarBtnBox}>
          <ChevronLeft
            onClick={handlePrevMonth}
            width="18px"
            cursor="pointer"
          />
          <ChevronRight
            onClick={handleNextMonth}
            width="18px"
            cursor="pointer"
          />
        </div>
      </div>

      <div css={CalendarGrid}>
        {weeks.map((d) => (
          <div css={DayHeader} key={d}>
            {d}
          </div>
        ))}

        {days.map((day) => {
          const isCurrentMonth = day.month() === currentMonth.month();
          if (!isCurrentMonth) {
            return <div key={day.toString()} />;
          }

          const isToday = day.isSame(dayjs(), "day");
          const isSelected = selectedDate?.isSame(day, "day");

          const completedCategories = getCompletedCategories(day);
          const dayNotDone = getDayNotDoneCount(day);
          const dayColor = getDayColor(day);

          return (
            <div
              key={day.toString()}
              css={[DayCell, isToday && TodayCell]}
              onClick={() => setSelectedDate(day)}
            >
              <div css={TodoIconBox}>
                {dayNotDone > 0 && <span>{dayNotDone}</span>}
                {dayNotDone === 0 && completedCategories.length > 0 && (
                  <Check
                    css={css`
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%, -50%);
                      width: 15px;
                      height: 15px;
                    `}
                  />
                )}
                <TodoIcon colors={completedCategories} />
              </div>
              {isSelected ? (
                <div css={SelectedDate}>{day.date()}</div>
              ) : (
                <div style={{ color: dayColor }}>{day.date()}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarDateBox = css`
  margin-left: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TodoIconBox = css`
  position: relative;
  width: 22px;
  height: 22px;
  cursor: pointer;
  span {
    position: absolute;
    display: flex;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 800;
  }
`;

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
  span {
    font-weight: 700;
    font-size: 13px;
  }
`;

const CalendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
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
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 700;
`;

const TodayCell = css`
  color: #fff;
  font-weight: bold;
`;

const CountBox = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
  span {
    font-size: 13px;
  }
`;

export default Calendar;
