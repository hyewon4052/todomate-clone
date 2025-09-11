type TodoIconSvgProps = {
  colors?: string[];
};

const TodoIconSvg = ({ colors = [] }: TodoIconSvgProps) => {
  const defaultColor = "var(--main-gray)";
  let circleColors: string[] = Array(4).fill(defaultColor);

  switch (colors.length) {
    case 1:
      circleColors = Array(4).fill(colors[0]);
      break;
    case 2:
      circleColors[0] = colors[1];
      circleColors[1] = colors[0];
      circleColors[2] = colors[0];
      circleColors[3] = colors[1];
      break;
    case 3:
      circleColors[0] = colors[1];
      circleColors[1] = colors[1];
      circleColors[2] = colors[2];
      circleColors[3] = colors[0];
      break;
    case 4:
      circleColors[0] = colors[2];
      circleColors[1] = colors[0];
      circleColors[2] = colors[3];
      circleColors[3] = colors[1];
      break;
  }

  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6.46154"
        cy="6.46154"
        r="6.46154"
        fill={circleColors[0]}
        fillOpacity="0.9"
      />
      <circle
        cx="6.46154"
        cy="14.5387"
        r="6.46154"
        fill={circleColors[1]}
        fillOpacity="0.9"
      />
      <circle
        cx="14.5387"
        cy="14.5387"
        r="6.46154"
        fill={circleColors[2]}
        fillOpacity="0.9"
      />
      <circle
        cx="14.5387"
        cy="6.46154"
        r="6.46154"
        fill={circleColors[3]}
        fillOpacity="0.9"
      />
    </svg>
  );
};

export default TodoIconSvg;
