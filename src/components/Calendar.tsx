/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import TodoIcon from "./TodoIconSvg";
import "dayjs/locale/ko";
import { currentMonthAtom, selectedDateAtom } from "../jotai/calendar/atoms";
import { daysCalendarAtom } from "../jotai/calendar/selectors";
import { monthDoneAtom, todoListAtom } from "../jotai/todo/atoms";
import { orderBy } from "es-toolkit";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useAtom(currentMonthAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [monthDone] = useAtom(monthDoneAtom);
  const [todoList] = useAtom(todoListAtom);
  const [days] = useAtom(daysCalendarAtom);

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
    setSelectedDate(selectedDate.subtract(1, "month").startOf("month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
    setSelectedDate(selectedDate.add(1, "month").startOf("month"));
  };

  return (
    <div css={CalendarBox}>
      <div css={CalendarHeader}>
        <div css={CountBox}>
          <span>{currentMonth.format("MMM YYYY")}</span>
          <BadgeCheck width="18px" />
          <span>{monthDone}</span>
        </div>
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

          const completedCategories: string[] = [];
          const seenCategory = new Set<number>();

          orderBy(
            todoList.filter(
              (todo) => dayjs(todo.date).isSame(day, "day") && todo.isdone
            ),
            [(todo) => todo.doneAt],
            ["asc"]
          ).forEach((todo) => {
            if (!seenCategory.has(todo.categoryId)) {
              seenCategory.add(todo.categoryId);
              completedCategories.push(
                {
                  1: "var(--category--01)",
                  2: "var(--category--02)",
                  3: "var(--category--03)",
                  4: "var(--category--04)",
                }[todo.categoryId] ?? "var(--main-gray)"
              );
            }
          });

          const dayNotDone = todoList.filter(
            (todo) => dayjs(todo.date).isSame(day, "day") && !todo.isdone
          ).length;

          const dayOfWeek = day.day();
          const dayColor =
            dayOfWeek === 0 ? "red" : dayOfWeek === 6 ? "blue" : "white";

          return (
            <div
              key={day.toString()}
              css={[DayCell, isToday && TodayCell]}
              onClick={() => setSelectedDate(day)}
            >
              <div css={TodoIconBox}>
                {dayNotDone > 0 && <span>{dayNotDone}</span>}
                <TodoIcon colors={completedCategories} />
              </div>
              {isSelected ? (
                <div css={[SelectedDate, { color: "black" }]}>{day.date()}</div>
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

const TodoIconBox = css`
  position: relative;
  span {
    position: absolute;
    display: flex;
    left: 33%;
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
  }
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
  gap: 5px;
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
`;

export default Calendar;
