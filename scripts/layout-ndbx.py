# /// script
# requires-python = ">=3.9"
# ///
"""Lay out the nodes of a NodeBox network the way NodeBox 3 draws one: sources at
the top, the rendered node at the bottom, wires running down.

Usage: uv run scripts/layout-ndbx.py media/homepage/examples/*.ndbx

Only the position attributes change. NodeBox 3 draws a node about three grid
units wide and one high, so nodes are four units apart across and two down.
"""
import re
import sys
import xml.etree.ElementTree as ET

STEP_X, STEP_Y = 4, 2


def layout(text):
    root = ET.fromstring(text.encode())
    network = root.find("node")
    names = [n.get("name") for n in network.findall("node")]
    edges = []  # (from, to)
    for c in network.findall("conn"):
        edges.append((c.get("output"), c.get("input").split(".")[0]))
    parents = {n: [a for a, b in edges if b == n and a in names] for n in names}
    children = {n: [b for a, b in edges if a == n and b in names] for n in names}

    depth = {}

    def of(n, seen=()):
        if n in depth:
            return depth[n]
        if n in seen:
            return 0
        depth[n] = max((of(p, seen + (n,)) + 1 for p in parents[n]), default=0)
        return depth[n]

    for n in names:
        of(n)
    # A node with no inputs sits just above its first consumer, not at the top.
    for n in names:
        if not parents[n] and children[n]:
            depth[n] = min(depth[c] for c in children[n]) - 1

    layers = {}
    for n in names:
        layers.setdefault(depth[n], []).append(n)
    levels = sorted(layers)
    x = {n: i for lv in levels for i, n in enumerate(layers[lv])}

    def sweep(order, neighbours):
        for lv in order:
            layers[lv].sort(key=lambda n: (sum(x[p] for p in neighbours[n]) / len(neighbours[n])) if neighbours[n] else x[n])
            for i, n in enumerate(layers[lv]):
                x[n] = i

    for _ in range(6):
        sweep(levels[1:], parents)
        sweep(reversed(levels[:-1]), children)

    # Put each node under the middle of its inputs, keeping the order in a row.
    pos = {}
    for lv in levels:
        row = layers[lv]
        left = -10 ** 9
        for n in row:
            want = sum(pos[p][0] for p in parents[n] if p in pos) / len([p for p in parents[n] if p in pos]) if any(p in pos for p in parents[n]) else None
            at = round(want) if want is not None else left + STEP_X
            at = max(at, left + STEP_X)
            pos[n] = (at, (lv - levels[0]) * STEP_Y)
            left = at
    low = min(p[0] for p in pos.values())
    return {n: (p[0] - low + 1, p[1] + 1) for n, p in pos.items()}


def apply(text, pos):
    def put(m):
        name = m.group(1)
        x, y = pos[name]
        return f'<node name="{name}" position="{x}.00,{y}.00"'
    return re.sub(r'<node name="([^"]+)" position="[^"]*"', lambda m: put(m) if m.group(1) in pos else m.group(0), text)


for path in sys.argv[1:]:
    text = open(path, encoding="utf-8").read()
    open(path, "w", encoding="utf-8").write(apply(text, layout(text)))
    print("laid out", path)
