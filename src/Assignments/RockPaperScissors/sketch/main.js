const canvasContainer = document.getElementById("canvas-container");
let renderer;

const INITIAL_W = 600;
const INITIAL_H = 700;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

const cellsPerRow = 80;
let cellsPerColumn;
const cells = [];
let cellSize;

let hoveredCell = null;

function getIdx(r, c) {
  return r * cellsPerRow + c;
}

let lastTime = 0;
const interval = 100;

function setup() {
  renderer = createCanvas(INITIAL_W, INITIAL_H);
  renderer.parent(canvasContainer);
  renderer.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    renderer.elt.style.width = `${containerWidth}px`;
    renderer.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);

  cellSize = width / cellsPerRow;
  cellsPerColumn = Math.floor(height / cellSize);

  for (let r = 0; r < cellsPerColumn; r++) {
    for (let c = 0; c < cellsPerRow; c++) {
      const x = c * cellSize;
      const y = r * cellSize;
      const randomState = random(["R", "P", "S"]);
      const newCell = new Cell(x, y, cellSize, cellSize, randomState);
      cells.push(newCell);
    }
  }

  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / cellsPerRow);
    const col = idx % cellsPerRow;
    const tl = row > 0 && col > 0 ? cells[getIdx(row - 1, col - 1)] : null;
    const t = row > 0 ? cells[getIdx(row - 1, col)] : null;
    const tr =
      row > 0 && col < cellsPerRow - 1 ? cells[getIdx(row - 1, col + 1)] : null;
    const r = col < cellsPerRow - 1 ? cells[getIdx(row, col + 1)] : null;
    const br =
      row < cellsPerColumn - 1 && col < cellsPerRow - 1
        ? cells[getIdx(row + 1, col + 1)]
        : null;
    const b = row < cellsPerColumn - 1 ? cells[getIdx(row + 1, col)] : null;
    const bl =
      row < cellsPerColumn - 1 && col > 0
        ? cells[getIdx(row + 1, col - 1)]
        : null;
    const l = col > 0 ? cells[getIdx(row, col - 1)] : null;
    cell.setNeighbors(tl, t, tr, r, br, b, bl, l);
  });
}

function draw() {
  background(250);

  if (millis() - lastTime > interval) {
    cells.forEach((c) => c.computeNextState());
    cells.forEach((c) => c.updateState());
    lastTime = millis();
  }

  cells.forEach((cell) => cell.render(cell === hoveredCell));

  const Rcount = cells.filter((c) => c.state === "R").length;
  const Pcount = cells.filter((c) => c.state === "P").length;
  const Scount = cells.length - Rcount - Pcount;
  const total = cells.length;

  const Rratio = (Rcount / total) * 100;
  const Pratio = (Pcount / total) * 100;
  const Sratio = (Scount / total) * 100;

  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(`R: ${Rcount}  P: ${Pcount}  S: ${Scount}`, 10, 10);

  const graphY = height - 100;
  const graphH = 100;

  noStroke();

  fill("#FFBDBD");
  rect(0, graphY, (width * Rcount) / total, graphH);

  fill("#BADFDB");
  rect((width * Rcount) / total, graphY, (width * Pcount) / total, graphH);

  fill("#FBF3D1");
  rect(
    (width * (Rcount + Pcount)) / total,
    graphY,
    (width * Scount) / total,
    graphH
  );

  fill(0);
  textSize(14);
  textAlign(CENTER, CENTER);

  text(
    `${Rratio.toFixed(1)}%`,
    (width * Rcount) / 2 / total,
    graphY + graphH / 2
  );
  text(
    `${Pratio.toFixed(1)}%`,
    (width * (Rcount + Pcount / 2)) / total,
    graphY + graphH / 2
  );
  text(
    `${Sratio.toFixed(1)}%`,
    (width * (Rcount + Pcount + Scount / 2)) / total,
    graphY + graphH / 2
  );
}

function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cells.length; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
      break;
    }
  }
}

function mousePressed() {
  hoveredCell?.toggleState();
}
