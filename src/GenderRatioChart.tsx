import genderData from "../_data/processed/dept_gender.json";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function GenderRatioChart() {
  const chartRef = useRef<HTMLDivElement>(null);


  const orderedRatio = genderData.sort(
    (a, b) => (a.gender_ratio ?? 0) - (b.gender_ratio ?? 0)
  )


  useEffect(() => {
    if (!chartRef.current) return;

    // Clear any existing content
    d3.select(chartRef.current).selectAll("*").remove();

    // Chart dimensions
    const width = 800;
    const height = 1600;
    const margin = { top: 20, right: 250, bottom: 20, left: 100 };

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Y Scale - logarithmic scale for equal spacing
    const yScale = d3
      .scaleLinear()
      .domain([-1, 1]) // Log-transformed domain: -1 to 1
      .range([height - margin.bottom, margin.top]);

    // Function to transform ratio to log scale
    const transformRatio = (ratio: number) => {
      if (ratio <= 0) return 0; 
      return Math.log10(ratio); // Convert to log scale
    };

    // Function to format ratio display
    const formatRatio = (ratio: number) => {
      if (!ratio || ratio === 0) {
        return "None"
      }
      if (ratio < 1) {
        return `1:${(1 / ratio).toFixed()}`;
      } else {
        return `${ratio.toFixed()}:1`;
      }
    };

    // Reference line at 1:1 (log value = 0)
    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", yScale(0))
      .attr("y2", yScale(0))
      .attr("stroke", "#666")
      .attr("stroke-dasharray", "5,5");

    // Circles with conditional coloring
    svg
      .selectAll("circle")
      .data(orderedRatio)
      .enter()
      .append("circle")
      .attr("cx", margin.left)
      .attr("cy", (d) => yScale(transformRatio(d.gender_ratio ?? 0)))
      .attr("r", 4)
      .attr("fill", (d) => {
        const ratio = d.gender_ratio ?? 0;
        if (!ratio) {
          return '#BBBBBB' // Gray
        }
        if (ratio > 0.75 && ratio < 1.5) {
          return "#16a34a"; // Green for balanced ratios
        } else if (ratio >= 2) {
          return "#2563eb"; // Blue for more men
        } else {
          return "#FF1111"; // Red for more women
        }
      });

    // Text Labels
    svg
      .selectAll("text")
      .data(orderedRatio)
      .enter()
      .append("text")
      .attr("x", margin.left + 15)
      .attr("y", (d) => yScale(transformRatio(d.gender_ratio ?? 0)))
      .attr("dy", "0.35em")
      .attr("font-size", "11px")
      .attr("fill", "#333")
      .text((d) => `${d.department} (${formatRatio(d.gender_ratio ?? 0)})`);

    // Y Axis with custom tick labels
    const yAxis = d3.axisLeft(yScale);
    
    // Custom tick values on log scale
    const logTickValues = [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1];
    
    yAxis
      .tickValues(logTickValues)
      .tickFormat((d) => {
        const logValue = d as number;
        const ratio = Math.pow(10, logValue);
        return formatRatio(ratio);
      });

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text("Gender Ratio (F:M)");

    // Green circle for balanced ratios
    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 25)
      .attr("r", 6)
      .attr("fill", "#16a34a");

    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 30)
      .attr("font-size", "12px")
      .text("Balanced (0.9:1 to 1.1:1)");

    // Red circle for more women
    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 55)
      .attr("r", 6)
      .attr("fill", "#dc2626");

    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 60)
      .attr("font-size", "12px")
      .text("More Women (F > M)");

    // Blue circle for more men
    legend
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 85)
      .attr("r", 6)
      .attr("fill", "#2563eb");

    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 90)
      .attr("font-size", "12px")
      .text("More Men (M > F)");

    // Reference line label
    svg
      .append("text")
      .attr("x", width - margin.right + 20)
      .attr("y", yScale(0)+2)
      .attr("font-size", "10px")
      .attr("fill", "#666")
      .text("Equal (1:1)");

  }, []);

  return (
    <div>
      <div ref={chartRef}></div>
    </div>
  );
}