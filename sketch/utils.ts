function intersectionRectRect(rect1: Rect, rect2: Rect): boolean {
    var x1 = rect2.x, y1 = rect2.y, x2 = x1 + rect2.width, y2 = y1 + rect2.height;
    if (rect1.x > x1) { x1 = rect1.x; }
    if (rect1.y > y1) { y1 = rect1.y; }
    if (rect1.x + rect1.width < x2) { x2 = rect1.x + rect1.width; }
    if (rect1.y + rect1.height < y2) { y2 = rect1.y + rect1.height; }
    return (x2 <= x1 || y2 <= y1) ? false : true //{ x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}

function intersectLineRect(r: Rect, start: number, elevation: number): boolean {
    // TODO : on utilise des vecteurs, donc evec un SENS !!! 
    return (elevation>= r.y && elevation<= r.y + r.height)
}
