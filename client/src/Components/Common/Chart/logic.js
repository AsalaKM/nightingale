import * as d3 from 'd3';

export const layout = [
  '#6b486b', '#a05d56', '#d0743c', '#ff8c00','#98abc5', '#8a89a6', '#7b6888',
];

export const Chart = (sections, tag, width) => {
  const svgWidth = width;

  const svgHeight = width;

  const radius = Math.min(svgWidth, svgHeight) / 2;

  const svg = d3
    .select(tag)
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  const group = svg
    .append('g')
    .attr('transform', `translate(${radius},${radius})`);

  const pie = d3.pie().value(d => d.percentage);

  const path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 50);

  const arc = group
    .selectAll('arc')
    .data(pie(sections))
    .enter()
    .append('g');

  arc
    .append('path')
    .attr('d', path)
    .attr('fill', (d, i) => layout[i]);

  const label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 50);

  arc
    .append('text')
    .attr('transform', d => `translate(${label.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => `${d.data.percentage} %`)
    .style('font-size', '15px')
    .style('font-weight', 'bold')
    .style('fill', 'white')
    .style('cursor', 'pointer')
    .append('svg:title')
    .text(d => d.data.decription);
};
