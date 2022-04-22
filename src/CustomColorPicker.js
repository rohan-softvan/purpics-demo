import React, { useMemo, useState } from "react";
import {
  AlphaPicker,
  BlockPicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker
} from "react-color";

const decimalToHex = alpha =>
  alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

function CustomColorPicker() {
  const [color, setColor] = useState("red");
  const hexColor = useMemo(() => {
    if (typeof color === "string") {
      return color;
    }
    return `${color.hex}${decimalToHex(color.rgb.a)}`;
  }, [color]);

  const handleAutoColorClick = () => {
    setColor("#000");
  };

  return (
    <div
      style={{
        background: "PeachPuff",
        height: "100vh",
        overflowWrap: "break-word"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          // alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          flexDirection: "column",
          width: 240
        }}
      >
        {/*<AlphaPicker color={hexColor} onChange={setColor} />*/}
        {/*<BlockPicker color={hexColor} onChange={setColor} />*/}
        <button className={"auto-btn"} onClick={handleAutoColorClick}>
          Auto
        </button>
        Standard:
        <CirclePicker
          color={hexColor}
          onChange={setColor}
          colors={["#ff0000", "#ffffff", "#ccffcc"]}
        />
        <SketchPicker
          color={hexColor}
          onChange={setColor}
          disableAlpha
          presetColors={["#ff0000", "#ffffff", "#ccffcc"]}
        />
        <div
          style={{ width: "100px", height: "100px", backgroundColor: hexColor }}
        />
        {/*<MaterialPicker color={hexColor} onChange={setColor} />*/}
        {/*<CirclePicker color={hexColor} onChange={setColor} />*/}
        {/*<CompactPicker color={hexColor} onChange={setColor} />*/}
        {/*<GithubPicker color={hexColor} onChange={setColor} />*/}
        {/*<HuePicker color={hexColor} onChange={setColor} />*/}
        {/*<SliderPicker color={hexColor} onChange={setColor} />*/}
        {/*<SwatchesPicker color={hexColor} onChange={setColor} />*/}
        {/*<div*/}
        {/*  style={{*/}
        {/*    width: 400,*/}
        {/*    height: 200,*/}
        {/*    margin: 20,*/}
        {/*    flexGrow: 1,*/}
        {/*    background: hexColor,*/}
        {/*    borderRadius: "50%"*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
      {/*Selected color {JSON.stringify(color)}*/}
    </div>
  );
}

export default CustomColorPicker;
