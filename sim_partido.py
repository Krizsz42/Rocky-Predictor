"""
Motor de simulacion de partidos - Mundial 2026
Modelo: Poisson bivariado + ajuste Dixon-Coles, resuelto por Monte Carlo.
Uso educativo / prode. NO es asesoramiento de apuestas.

Como usar:
    python sim_partido.py
Editar el bloque CONFIG (lambdas, rho, nombres) con los xG calibrados
para el partido concreto. Los xG se construyen de abajo hacia arriba
(ajustados al rival y al contexto), NO con xG historico crudo.
"""

import numpy as np
from scipy.stats import poisson
from collections import Counter

# ============================================================
# CONFIG  -- editar por partido con los xG ya calibrados
# ============================================================
HOME = "Belgica"         # nombre equipo local / primero
AWAY = "Iran"            # nombre equipo visitante / segundo
lam_home = 1.85          # xG esperado HOME PARA ESTE partido
lam_away = 0.72          # xG esperado AWAY PARA ESTE partido
rho = -0.06              # Dixon-Coles: -0.07/-0.08 trabado, -0.03 abierto
N = 300_000             # numero de simulaciones Monte Carlo
max_g = 8               # tope de goles por equipo en la grilla
SEED = 42               # reproducibilidad
# ============================================================


def dc(i, j, l, m, r):
    """Factor de correccion Dixon-Coles para marcadores bajos."""
    if i == 0 and j == 0:
        return 1 - l * m * r
    if i == 0 and j == 1:
        return 1 + l * r
    if i == 1 and j == 0:
        return 1 + m * r
    if i == 1 and j == 1:
        return 1 - r
    return 1.0


def construir_matriz(lh, la, r, mg):
    P = np.zeros((mg + 1, mg + 1))
    for i in range(mg + 1):
        for j in range(mg + 1):
            P[i, j] = poisson.pmf(i, lh) * poisson.pmf(j, la) * dc(i, j, lh, la, r)
    # corregir posibles negativos del DC en celdas extremas
    P[P < 0] = 0
    P /= P.sum()
    return P


def simular(P, n, mg, seed=None):
    rng = np.random.default_rng(seed)
    flat = P.flatten()
    idx = rng.choice(len(flat), size=n, p=flat)
    hg = idx // (mg + 1)
    ag = idx % (mg + 1)
    return hg, ag


def pct(x):
    return f"{100 * x:5.1f}%"


def main():
    P = construir_matriz(lam_home, lam_away, rho, max_g)
    hg, ag = simular(P, N, max_g, SEED)

    home_w = np.mean(hg > ag)
    draw = np.mean(hg == ag)
    away_w = np.mean(hg < ag)

    total = hg + ag
    o15 = np.mean(total > 1.5)
    o25 = np.mean(total > 2.5)
    o35 = np.mean(total > 3.5)
    btts = np.mean((hg > 0) & (ag > 0))
    cs_home = np.mean(ag == 0)   # valla invicta local
    cs_away = np.mean(hg == 0)   # valla invicta visitante

    xg_home_sim = hg.mean()
    xg_away_sim = ag.mean()

    # marcadores exactos top
    scores = Counter(zip(hg.tolist(), ag.tolist()))
    top = scores.most_common(8)

    line = "=" * 56
    print(line)
    print(f"  {HOME}  vs  {AWAY}")
    print(f"  lambda: {HOME} {lam_home:.2f} | {AWAY} {lam_away:.2f} | rho {rho} | N {N:,}")
    print(line)

    print("\n-- 1X2 --")
    print(f"  Gana {HOME:<14} {pct(home_w)}")
    print(f"  Empate{'':<13} {pct(draw)}")
    print(f"  Gana {AWAY:<14} {pct(away_w)}")

    print("\n-- Mercados de goles --")
    print(f"  Over 1.5   {pct(o15)}   Under 1.5  {pct(1-o15)}")
    print(f"  Over 2.5   {pct(o25)}   Under 2.5  {pct(1-o25)}")
    print(f"  Over 3.5   {pct(o35)}   Under 3.5  {pct(1-o35)}")
    print(f"  Ambos marcan (BTTS)   {pct(btts)}")
    print(f"  Valla invicta {HOME:<10} {pct(cs_home)}")
    print(f"  Valla invicta {AWAY:<10} {pct(cs_away)}")

    print("\n-- Goles esperados (simulados) --")
    print(f"  {HOME:<14} {xg_home_sim:.2f}")
    print(f"  {AWAY:<14} {xg_away_sim:.2f}")

    print("\n-- Marcadores mas probables --")
    for (h, a), c in top:
        print(f"  {h}-{a}   {pct(c / N)}")
    print(line)


if __name__ == "__main__":
    main()
