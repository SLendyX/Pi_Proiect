//tolerance
export const toleranceGap = [[18,30], [30,50]]
export const fundamentalTolerances =
[
{
    "01": 0.6,
    "0": 1,
    "1": 1.5,
    "2": 2.5,
    "3": 4,
    "4": 6,
    "5": 9,
    "6": 13,
    "7": 21,
    "8": 33,
    "9": 52,
    "10": 84,
    "11": 130,
    "12": 210,
    "13": 330,
    "14": 520,
    "15": 840,
    "16": 1300,
    "17": 2100,
    "18": 3300
},
{
    "01": 0.6,
    "0": 1,
    "1": 1.5,
    "2": 3.5,
    "3": 4,
    "4": 7,
    "5": 11,
    "6": 16,
    "7": 25,
    "8": 39,
    "9": 62,
    "10": 100,
    "11": 160,
    "12": 250,
    "13": 390,
    "14": 620,
    "15": 1000,
    "16": 1600,
    "17": 2500,
    "18": 3900
}
]
export const gapLimits = [[18, 24], [24, 30], [30, 40], [40, 50]]

//shaft
export const shaftJStepGap = [['5', '6'], ['7'], ['8']]

export const shaftUpperLimits = [
    { a: -300, b: -160, c: -110, cd: undefined, d: -65, e: -40, ef: undefined, f: -20, fg: undefined, g: -7, h: 0},
    { a: -300, b: -160, c: -110, cd: undefined, d: -65, e: -40, ef: undefined, f: -20, fg: undefined, g: -7, h: 0},
    { a: -310, b: -170, c: -120, cd: undefined, d: -80, e: -50, ef: undefined, f: -25, fg: undefined, g: -9, h: 0},
    { a: -320, b: -180, c: -130, cd: undefined, d: -80, e: -50, ef: undefined, f: -25, fg: undefined, g: -9, h: 0}
]

export const shaftLowerLimits = [
    {j:[-4, -8, undefined], k:[2, 0], m:8, n:15, p:22, r:28, s:35, t:undefined, u:41, v:47, x:54, y:63, z:73, za:98, zb:136, zc:188},
    {j:[-4, -8, undefined], k:[2, 0], m:8, n:15, p:22, r:28, s:35, t:41, u:48, v:55, x:64, y:75, z:88, za:118, zb:160, zc:218},
    {j:[-5, -10, undefined],k:[2, 0], m:9, n:17, p:26, r:34, s:43, t:48, u:60, v:68, x:80, y:94, z:112, za:148, zb:200, zc:274},
    {j:[-5, -10, undefined], k:[2, 0], m:9, n:17, p:26, r:34, s:43, t:54, u:70, v:81, x:97, y:114, z:136, za:180, zb:242, zc:325},
]

//hub
export const deltas = 
[
    {"3":1.5, "4":2, "5":3, "6":4, "7":8, "8":12},
    {"3":1.5, "4":3, "5":4, "6":5, "7":9, "8":14}
]

export const hubLowerLimits = [
    { A: 300, B: 160, C: 110, CD: undefined, D: 65, E: 40, EF: undefined, F: 20, FG: undefined, G: 7, H: 0},
    { A: 300, B: 160, C: 110, CD: undefined, D: 65, E: 40, EF: undefined, F: 20, FG: undefined, G: 7, H: 0},
    { A: 310, B: 170, C: 120, CD: undefined, D: 80, E: 50, EF: undefined, F: 25, FG: undefined, G: 9, H: 0},
    { A: 320, B: 180, C: 130, CD: undefined, D: 80, E: 50, EF: undefined, F: 25, FG: undefined, G: 9, H: 0}
]

export const hubUpperLimits = [
    {J:[8, 12, 20], K:[-2, undefined], M:[-8, -8], N:[-15, 0], P:-22, R:-28, S:-35, T:undefined, U:-41, V:-47, X:-54, Y:-63, Z:-73, ZA:-98, ZB:-136, ZC:-188},
    {J:[8, 12, 20], K:[-2, undefined], M:[-8, -8], N:[-15, 0], P:-22, R:-28, S:-35, T:-41, U:-48, V:-55, X:-64, Y:-75, Z:-88, ZA:-118, ZB:-160, ZC:-218},
    {J:[10, 14, 24], K:[-2, undefined], M:[-9, -9], N:[-17, 0], P:-26, R:-34, S:-43, T:-48, U:-60, V:-68, X:-80, Y:-94, Z:-112, ZA:-148, ZB:-200, ZC:-274},
    {J:[10, 14, 24], K:[-2, undefined], M:[-9, -9], N:[-17, 0], P:-26, R:-34, S:-43, T:-54, U:-70, V:-81, X:-97, Y:-114, Z:-136, ZA:-180, ZB:-242, ZC:-325},
]