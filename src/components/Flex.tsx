import styled from "@emotion/styled";

export type FlexProps = {
  flex?: number;
  row?: boolean;
  col?: boolean;
  center?: boolean;
  vc?: boolean;
  hc?: boolean;
  start?: boolean;
  end?: boolean;
  vEnd?: boolean;
  hEnd?: boolean;
  wrap?: boolean;
  gap?: number;
  padding?: number | string;
  margin?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  pv?: number | string;
  ph?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mv?: number | string;
  mh?: number | string;
  width?: number | string;
  height?: number | string;
  shrink?: boolean;
  spaceBetween?: boolean;
  spaceAround?: boolean;
  spaceEvenly?: boolean;
};

const Flex = styled.div<FlexProps>`
  display: flex;
  flex: ${({ flex }) => flex ?? ""};
  flex-direction: ${({ row, col }) =>
    row ? "row" : col ? "column" : "column"};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "")};
  width: ${({ width }) => (isNumber(width) ? width + "px" : width ?? "")};
  height: ${({ height }) => (isNumber(height) ? height + "px" : height ?? "")};
  flex-shrink: ${({ shrink }) => (shrink ? "" : 0)};
  gap: ${({ gap }) => gap ?? 0}px;
  justify-content: ${({
    col,
    center,
    vc,
    hc,
    end,
    vEnd,
    hEnd,
    spaceBetween,
    spaceAround,
    spaceEvenly,
  }) => {
    if (center) return "center";
    if (end) return "flex-end";
    if (col) {
      if (vc) return "center";
      if (vEnd) return "flex-end";
    } else {
      if (hc) return "center";
      if (hEnd) return "flex-end";
    }
    if (spaceBetween) return "space-between";
    if (spaceAround) return "space-around";
    if (spaceEvenly) return "space-evenly";
    return "";
  }};
  align-items: ${({ col, center, vc, hc, start, end, vEnd, hEnd }) => {
    if (center) return "center";
    if (end) return "flex-end";
    if (start) return "flex-start";
    if (col) {
      if (hc) return "center";
      if (hEnd) return "flex-end";
    } else {
      if (vc) return "center";
      if (vEnd) return "flex-end";
    }
    return "";
  }};
  padding: ${(props) => paddings(props)};
  margin: ${(props) => margins(props)};
`;

function paddings({ padding, pt, pr, pb, pl, pv, ph }: FlexProps) {
  return `${cssUnit(pt ?? pv ?? padding ?? 0)} ${cssUnit(
    pr ?? ph ?? padding ?? 0
  )} ${cssUnit(pb ?? pv ?? padding ?? 0)} ${cssUnit(pl ?? ph ?? padding ?? 0)}`;
}

function margins({ margin, mt, mr, mb, ml, mv, mh }: FlexProps) {
  return `${cssUnit(mt ?? mv ?? margin ?? 0)} ${cssUnit(
    mr ?? mh ?? margin ?? 0
  )} ${cssUnit(mb ?? mv ?? margin ?? 0)} ${cssUnit(ml ?? mh ?? margin ?? 0)}`;
}

function isNumber(value: any): value is number {
  return typeof value === "number";
}

function cssUnit(value: string | number) {
  return typeof value === "number" ? value + "px" : value;
}

export default Flex;
