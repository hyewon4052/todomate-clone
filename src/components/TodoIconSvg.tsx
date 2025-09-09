type TodoIconSvgProps = {
  color?: string;
};

const TodoIconSvg = ({ color = "#222222" }: TodoIconSvgProps) => {
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
        fill={color}
        fillOpacity="0.9"
      />
      <circle
        cx="6.46154"
        cy="14.5387"
        r="6.46154"
        fill={color}
        fillOpacity="0.9"
      />
      <circle
        cx="14.5387"
        cy="14.5387"
        r="6.46154"
        fill={color}
        fillOpacity="0.9"
      />
      <circle
        cx="14.5387"
        cy="6.46154"
        r="6.46154"
        fill={color}
        fillOpacity="0.9"
      />
    </svg>
  );
};

export default TodoIconSvg;
