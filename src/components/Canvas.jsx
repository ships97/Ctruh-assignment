import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import "../styles/Canvas.css";

function Canvas() {
  const [color, setColor] = useState('#000000');
  const [number, setNumber] = useState('00');
  const [palette, setPalette] = useState("default");
  const [canvasSize, setCanvasSize] = useState({ width: 450, height: 470 });
  // const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = getBackgroundColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawNumber(ctx, number, canvas.width, canvas.height);
    canvas.style.backgroundColor = getBackgroundColor();
  }, [color, palette, number]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleNumberChange = (event) => {
    const newNumber = event.target.value.slice(0, 2);
    setNumber(newNumber);
  };

  const handlePaletteChange = (event) => {
    setPalette(event.target.value);
  };

  const handleCanvasSizeChange = (event, dimension) => {
    setCanvasSize({
      ...canvasSize,
      [dimension]: parseInt(event.target.value, 10),
    });
  };

  const getBackgroundColor = () => {
    switch (palette) {
      case 'red':
        return '#FF0000';
      case 'green':
        return '#00FF00';
      case 'blue':
        return '#0000FF';
      default:
        return color;
    }
  };

  const drawNumber = (ctx, number, width, height, size = 100, x = 50, y = 50) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = '#000000';
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // ctx.onMouseOver
    ctx.fillText(number, x + size / 2, y + size / 2);
  };

  return (
    <div className='main'>
      <div id='first'>
      <canvas id='inner'
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        // onMouseOver={handleCanvasMouseOver}
        />
        </div>

        {/* Second div start */}
        <div id='second'>
        <div id='color'>
          <label>Color:</label>
          <SketchPicker id="" color={color} onChange={handleColorChange} />
        </div>
        <div id='number'>
          <label>Number:</label>
          <input id='input' type="number" value={number} onChange={handleNumberChange} maxLength="2" />
        </div>
        <div id='plate'>
          <label>Palette:</label>
          <select id='palatte' value={palette} onChange={handlePaletteChange}>
            <option value="default">Default</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div id='wd'>
          <label>Width:</label>
          <input id='input1' type="number" value={canvasSize.width} onChange={(event) => handleCanvasSizeChange(event, 'width')} />
        </div>
        <div id='ht'>
          <label>Height:</label>
          <input id='input1' type="number" value={canvasSize.height} onChange={(event) => handleCanvasSizeChange(event, 'height')} />
        </div>
        </div>
      </div>
      );
    }
    
    export default Canvas;      