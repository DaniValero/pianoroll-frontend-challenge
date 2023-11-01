import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

function PianoRoll({ sequence, rollId }) {
  const svgRef = useRef();

  const [loading, setLoading] = useState(true);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [noteColors, setNoteColors] = useState([]);


  function generateGradientTable(startColor, endColor, steps) {
  const gradientTable = [];
  for (let i = 0; i < steps; i++) {
    const r = startColor.r + ((endColor.r - startColor.r) * i) / (steps - 1);
    const g = startColor.g + ((endColor.g - startColor.g) * i) / (steps - 1);
    const b = startColor.b + ((endColor.b - startColor.b) * i) / (steps - 1);
    gradientTable.push(`rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`);
    }
    return gradientTable;
  }

  useEffect(() => {

    if (sequence.length > 0) {
      // Define the SVG container using D3.js
      const svg = d3.select(svgRef.current);

      // Define the color scale for note colors
      const colorScale = d3
        .scaleLinear()
        .domain([0, 127])
        .range(["rgb(66, 66, 61)", "rgb(28, 28, 26)"]);

      // Draw the background PianoRoll
      svg
        .selectAll("rect.background")
        .data(sequence)
        .enter()
        .append("rect")
        .attr("class", "background")
        .attr("x", (note) => (note.start / sequence[sequence.length - 1].end))
        .attr("y", (note) => (note.pitch - 3) / 127)
        .attr("width", 100000)
        .attr("height", 1 / 127)
        .attr("fill", "rgb(93, 181, 213)")
        .attr("fill-opacity", 0.555);

      // Draw the MIDI notes
      svg
        .selectAll("rect.note")
        .data(sequence)
        .enter()
        .append("rect")
        .attr("class", "note")
        .attr("x", (note) => (note.start / sequence[sequence.length - 1].end))
        .attr("y", (note) => (note.pitch - 3) / 127)
        .attr("width", (note) => (note.end - note.start) / sequence[sequence.length - 1].end)
        .attr("height", 1 / 127)
        .attr("fill", (note) => colorScale(note.velocity));
    
      // Generate background colors
      const backgroundStartColor = { r: 93, g: 181, b: 213 };
      const backgroundEndColor = { r: 21, g: 65, b: 81 };
      (generateGradientTable(backgroundStartColor, backgroundEndColor, 128));

      // Generate note colors
      const noteStartColor = { r: 66, g: 66, b: 61 };
      const noteEndColor = { r: 28, g: 28, b: 26 };
      setNoteColors(generateGradientTable(noteStartColor, noteEndColor, 128));

      setLoading(false);
    }
  }, [sequence]);

  return (
    <div>
      {sequence.length === 60 &&
        <svg
          ref={svgRef}
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          key={rollId}
        />
      }
    </div>
  );
}

export default PianoRoll;
