import React, { useEffect, useState } from "react";

function PianoRoll({ sequence }) {
  const [backgroundColormap, setBackgroundColormap] = useState([]);
  const [noteColormap, setNoteColormap] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [noteHeight, setNoteHeight] = useState(null);
  const [pitchMin, setPitchMin] = useState(null);
  const [pitchMax, setPitchMax] = useState(null);
  const [pitchSpan, setPitchSpan] = useState(null);
  const [svgElements, setSvgElements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to generate a gradient table
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

  // Convert time to X coordinate
  function timeToX(time) {
    return time / end;
  }

  // Draw the PianoRoll
  function drawPianoRoll() {
    if (!end || !pitchMin || !pitchSpan) {
      return; // Ensure the necessary values are defined
    }

    const newElements = [];

    sequence.forEach((note) => {
      const x = timeToX(note.start - start);
      const width = timeToX(note.end - note.start);
      const y = 1 - (note.pitch - pitchMin) / pitchSpan;
      const color = noteColormap[note.velocity];

      newElements.push(
        <rect
          x={x}
          y={y}
          width={width}
          height={noteHeight}
          fill={color}
          key={Math.random()*1000}
        />
      );
    });

    setSvgElements(newElements);
  }

  // Draw the empty PianoRoll
  function drawEmptyPianoRoll(pitchMin, pitchMax) {
    const pitchSpan = pitchMax - pitchMin;

    const newElements = [];

    for (let pitch = pitchMin; pitch <= pitchMax + 1; pitch++) {
      if ([1, 3, 6, 8, 10].includes(pitch % 12)) {
        const y = 1 - (pitch - pitchMin) / pitchSpan;
        const x = 0;
        const height = 1 / pitchSpan;
        const width = 1;

        newElements.push(
          <rect
            fill="backgroundColormap[12]"
            fillOpacity="0.555"
            x={x}
            y={y}
            width={width}
            height={height}
            key={`empty-${pitch}`}
          />
        );
      }
    }

    setSvgElements(newElements);
  }

  useEffect(() => {
    // Initialize backgroundColormap and noteColormap
    setBackgroundColormap(generateGradientTable({ r: 93, g: 181, b: 213 }, { r: 21, g: 65, b: 81 }, 128));
    setNoteColormap(generateGradientTable({ r: 66, g: 66, b: 61 }, { r: 28, g: 28, b: 26 }, 128));
    // Extract start and end from the sequence
    setStart(sequence[0].start);
    setEnd(sequence[sequence.length - 1].end - start);

    const pitches = sequence.map((note) => note.pitch);

    let minPitch = Math.min(...pitches);
    let maxPitch = Math.max(...pitches);
    let span = maxPitch - minPitch;
    setPitchMin(minPitch);
    setPitchMax(maxPitch);
    setPitchSpan(span);
    
    if (span < 24) {
      const diff = 24 - span;
      const low = Math.ceil(diff / 2);
      const high = Math.floor(diff / 2);
      minPitch -= low;
      maxPitch += high;
      span = maxPitch - minPitch;
      setPitchMin(minPitch);
      setPitchMax(maxPitch);
      setPitchSpan(span);
    }

    minPitch -= 3;
    maxPitch += 3;
    span = maxPitch - minPitch;
    setNoteHeight(1 / span);
    
    drawEmptyPianoRoll(minPitch, maxPitch);
    drawPianoRoll();

    setLoading(false);
  }, [svgElements]);

  return (
  loading ? <p>Loading...</p> :
    <svg viewBox="0 0 1 1" preserveAspectRatio="none" key={Math.random() * 1000}>
      {svgElements}
    </svg>
  );
}

export default PianoRoll;
