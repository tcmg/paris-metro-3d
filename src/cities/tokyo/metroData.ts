// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { CityMetroLine } from '../types';

export const TOKYO_METRO_SYSTEM_NAME = "TOKYO METRO, TOEI SUBWAY & JR YAMANOTE LOOP";

export const TOKYO_METRO_LINES: CityMetroLine[] = [
  {
    "line": "G",
    "name": "Ginza Line (銀座線) — Shibuya ↔ Omotesando ↔ Ginza ↔ Ueno ↔ Asakusa",
    "color": "#ff9500",
    "textColor": "#10141c",
    "openedYear": 1927,
    "rollingStockStyle": "Tokyo Underground Railway / Tokyo Metro (1000 Series Lemon-Yellow)",
    "stations": [
      {
        "name": "Asakusa (浅草)",
        "lat": 35.7119,
        "lon": 139.798,
        "x": 29.53,
        "z": -36.11,
        "year": 1927,
        "lines": [
          "G",
          "A"
        ],
        "fact": "Inaugural December 30, 1927 terminus of Asia’s first subway, steps from Sensō-ji’s Kaminarimon gate.",
        "isGhost": false
      },
      {
        "name": "Tawaramachi",
        "lat": 35.7099,
        "lon": 139.7909,
        "x": 22.74,
        "z": -33.75,
        "year": 1927,
        "lines": [
          "G"
        ],
        "fact": "Serves the Kappabashi kitchenware district.",
        "isGhost": false
      },
      {
        "name": "Ueno (上野)",
        "lat": 35.7115,
        "lon": 139.776,
        "x": 8.5,
        "z": -35.63,
        "year": 1927,
        "lines": [
          "G",
          "H",
          "JY"
        ],
        "fact": "Western terminus of the original 2.2 km 1927 subway line.",
        "isGhost": false
      },
      {
        "name": "Manseibashi (万世橋 • 1930–1931 Ghost Station)",
        "lat": 35.6968,
        "lon": 139.7711,
        "x": 3.82,
        "z": -18.35,
        "year": 1930,
        "lines": [
          "G"
        ],
        "fact": "Operated for only 23 months (Jan 1930 – Nov 1931) while the tunnel under the Kanda River to Kanda Station was being constructed; its subterranean chamber still survives inside the Ginza Line tunnel.",
        "isGhost": true
      },
      {
        "name": "Kanda (神田)",
        "lat": 35.6925,
        "lon": 139.7712,
        "x": 3.92,
        "z": -13.29,
        "year": 1931,
        "lines": [
          "G",
          "JY"
        ],
        "fact": "Opened in November 1931 when the Ginza Line crossed beneath the Kanda River.",
        "isGhost": false
      },
      {
        "name": "Mitsukoshimae (三越前)",
        "lat": 35.6849,
        "lon": 139.7732,
        "x": 5.83,
        "z": -4.35,
        "year": 1932,
        "lines": [
          "G",
          "Z"
        ],
        "fact": "Funded in 1932 by the Mitsukoshi Department Store with direct basement escalator access.",
        "isGhost": false
      },
      {
        "name": "Nihombashi (日本橋)",
        "lat": 35.6822,
        "lon": 139.7736,
        "x": 6.21,
        "z": -1.18,
        "year": 1932,
        "lines": [
          "G",
          "T",
          "A"
        ],
        "fact": "Located beneath Japan’s historic 1603 zero-mile road marker.",
        "isGhost": false
      },
      {
        "name": "Kyobashi",
        "lat": 35.6768,
        "lon": 139.7701,
        "x": 2.87,
        "z": 5.17,
        "year": 1932,
        "lines": [
          "G"
        ],
        "fact": "Eastern approach to Tokyo Station.",
        "isGhost": false
      },
      {
        "name": "Ginza (銀座)",
        "lat": 35.6712,
        "lon": 139.765,
        "x": -2.01,
        "z": 11.76,
        "year": 1934,
        "lines": [
          "G",
          "M",
          "H"
        ],
        "fact": "Directly beneath Ginza Yonchome Crossing and the 1932 Wako Clock Tower.",
        "isGhost": false
      },
      {
        "name": "Shimbashi (新橋 • with 1939 Ghost Platform)",
        "lat": 35.6664,
        "lon": 139.7583,
        "x": -8.41,
        "z": 17.41,
        "year": 1934,
        "lines": [
          "G",
          "A",
          "JY",
          "U"
        ],
        "fact": "Site where the rival Tokyo Underground Railway and Tokyo Rapid Railway met in 1939, leaving an unused ghost platform still preserved behind glass.",
        "isGhost": true
      },
      {
        "name": "Toranomon",
        "lat": 35.6702,
        "lon": 139.7498,
        "x": -16.53,
        "z": 12.94,
        "year": 1938,
        "lines": [
          "G"
        ],
        "fact": "Connected via underground passage to Toranomon Hills (Hibiya Line).",
        "isGhost": false
      },
      {
        "name": "Akasaka-mitsuke (赤坂見附)",
        "lat": 35.677,
        "lon": 139.7372,
        "x": -28.57,
        "z": 4.94,
        "year": 1938,
        "lines": [
          "G",
          "M"
        ],
        "fact": "Ingenious double-deck cross-platform transfer between the orange Ginza and red Marunouchi lines.",
        "isGhost": false
      },
      {
        "name": "Omotesando (表参道)",
        "lat": 35.6652,
        "lon": 139.7123,
        "x": -52.37,
        "z": 18.82,
        "year": 1938,
        "lines": [
          "G",
          "C",
          "Z"
        ],
        "fact": "Tree-lined Zelkova avenue leading to Meiji Jingu.",
        "isGhost": false
      },
      {
        "name": "Shibuya (渋谷)",
        "lat": 35.6588,
        "lon": 139.7016,
        "x": -62.59,
        "z": 26.34,
        "year": 1938,
        "lines": [
          "G",
          "Z",
          "F",
          "JY"
        ],
        "fact": "Perched 12 meters above ground in a dramatic valley between hills so the subway emerges onto a third-floor viaduct.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "M",
    "name": "Marunouchi Line (丸ノ内線) — Shinjuku ↔ Akasaka-mitsuke ↔ Ginza ↔ Tokyo ↔ Ikebukuro",
    "color": "#f62e36",
    "textColor": "#ffffff",
    "openedYear": 1954,
    "rollingStockStyle": "Teito Rapid Transit Authority (Eidan) / Tokyo Metro (2000 Series Sine-Wave Red)",
    "stations": [
      {
        "name": "Nishi-Shinjuku (西新宿)",
        "lat": 35.6945,
        "lon": 139.6926,
        "x": -71.19,
        "z": -15.64,
        "year": 1996,
        "lines": [
          "M"
        ],
        "fact": "Serves the Nishi-Shinjuku skyscraper cluster and Cocoon Tower.",
        "isGhost": false
      },
      {
        "name": "Shinjuku (新宿)",
        "lat": 35.69,
        "lon": 139.7004,
        "x": -63.74,
        "z": -10.35,
        "year": 1959,
        "lines": [
          "M",
          "S",
          "E",
          "JY",
          "JB"
        ],
        "fact": "Underground spine of the world’s busiest railway station (3.5M daily passengers).",
        "isGhost": false
      },
      {
        "name": "Shinjuku-sanchome",
        "lat": 35.6908,
        "lon": 139.7062,
        "x": -58.2,
        "z": -11.29,
        "year": 1959,
        "lines": [
          "M",
          "F",
          "S"
        ],
        "fact": "Connects Marunouchi, Fukutoshin, and Toei Shinjuku lines beneath Isetan.",
        "isGhost": false
      },
      {
        "name": "Yotsuya (四ツ谷)",
        "lat": 35.686,
        "lon": 139.7302,
        "x": -35.26,
        "z": -5.65,
        "year": 1959,
        "lines": [
          "M",
          "N",
          "JB"
        ],
        "fact": "Marunouchi Line emerges into daylight here to cross the deep Sotobori moat valley above the JR Chuo tracks.",
        "isGhost": false
      },
      {
        "name": "Akasaka-mitsuke (赤坂見附)",
        "lat": 35.677,
        "lon": 139.7372,
        "x": -28.57,
        "z": 4.94,
        "year": 1959,
        "lines": [
          "G",
          "M"
        ],
        "fact": "Cross-platform transfer with the Ginza Line.",
        "isGhost": false
      },
      {
        "name": "Kokkai-gijidomae (National Diet)",
        "lat": 35.6748,
        "lon": 139.7452,
        "x": -20.93,
        "z": 7.53,
        "year": 1959,
        "lines": [
          "M",
          "C"
        ],
        "fact": "Serves the 1936 granite pyramid of the National Diet Building.",
        "isGhost": false
      },
      {
        "name": "Kasumigaseki (霞ケ関)",
        "lat": 35.6738,
        "lon": 139.7512,
        "x": -15.19,
        "z": 8.7,
        "year": 1958,
        "lines": [
          "M",
          "H",
          "C"
        ],
        "fact": "Heart of Japan’s central government ministries next to Hibiya Park.",
        "isGhost": false
      },
      {
        "name": "Ginza (銀座)",
        "lat": 35.6712,
        "lon": 139.765,
        "x": -2.01,
        "z": 11.76,
        "year": 1957,
        "lines": [
          "G",
          "M",
          "H"
        ],
        "fact": "Western Ginza platforms beneath Sukiyabashi Crossing.",
        "isGhost": false
      },
      {
        "name": "Tokyo (東京)",
        "lat": 35.6812,
        "lon": 139.7648,
        "x": -2.2,
        "z": 0,
        "year": 1956,
        "lines": [
          "M",
          "JY"
        ],
        "fact": "Direct underground gateway to Kingo Tatsuno’s 1914 red-brick Tokyo Station and the Shinkansen platforms.",
        "isGhost": false
      },
      {
        "name": "Otemachi (大手町)",
        "lat": 35.6868,
        "lon": 139.7658,
        "x": -1.24,
        "z": -6.59,
        "year": 1956,
        "lines": [
          "M",
          "T",
          "C",
          "Z",
          "I"
        ],
        "fact": "Sprawling five-line subterranean network bordering the Imperial Palace East Gardens.",
        "isGhost": false
      },
      {
        "name": "Ochanomizu (御茶ノ水)",
        "lat": 35.6998,
        "lon": 139.7652,
        "x": -1.82,
        "z": -21.87,
        "year": 1954,
        "lines": [
          "M",
          "JB"
        ],
        "fact": "Famous photographic vantage where red Marunouchi trains emerge from the cliff to cross the Kanda River below JR Chuo and Sobu trains.",
        "isGhost": false
      },
      {
        "name": "Korakuen (後楽園)",
        "lat": 35.7078,
        "lon": 139.7518,
        "x": -14.62,
        "z": -31.28,
        "year": 1954,
        "lines": [
          "M",
          "N"
        ],
        "fact": "Overlooks the 1629 Edo-period stroll garden of Koishikawa Korakuen.",
        "isGhost": false
      },
      {
        "name": "Ikebukuro (池袋)",
        "lat": 35.7295,
        "lon": 139.7109,
        "x": -53.7,
        "z": -56.8,
        "year": 1954,
        "lines": [
          "M",
          "Y",
          "F",
          "JY"
        ],
        "fact": "Inaugural northern anchor of the 1954 Marunouchi Line and Tokyo’s second-busiest railway hub.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "H",
    "name": "Hibiya Line (日比谷線) — Ebisu ↔ Roppongi ↔ Toranomon Hills ↔ Ginza ↔ Ueno",
    "color": "#b5b5ac",
    "textColor": "#10141c",
    "openedYear": 1961,
    "rollingStockStyle": "Eidan / Tokyo Metro (13000 Series Silver)",
    "stations": [
      {
        "name": "Ebisu (恵比寿)",
        "lat": 35.6467,
        "lon": 139.7101,
        "x": -54.47,
        "z": 40.57,
        "year": 1964,
        "lines": [
          "H",
          "JY"
        ],
        "fact": "Named after the historic Yebisu Beer brewery.",
        "isGhost": false
      },
      {
        "name": "Roppongi (六本木)",
        "lat": 35.6628,
        "lon": 139.7314,
        "x": -34.11,
        "z": 21.64,
        "year": 1964,
        "lines": [
          "H",
          "E"
        ],
        "fact": "Serves Roppongi Hills, Mori Art Museum, and the National Art Center.",
        "isGhost": false
      },
      {
        "name": "Kamiyacho (神谷町 • Tokyo Tower North)",
        "lat": 35.663,
        "lon": 139.7451,
        "x": -21.02,
        "z": 21.4,
        "year": 1964,
        "lines": [
          "H"
        ],
        "fact": "Primary Hibiya Line gateway to Tokyo Tower and Azabudai Hills.",
        "isGhost": false
      },
      {
        "name": "Toranomon Hills (虎ノ門ヒルズ)",
        "lat": 35.6669,
        "lon": 139.7495,
        "x": -16.82,
        "z": 16.82,
        "year": 2020,
        "lines": [
          "H"
        ],
        "fact": "Opened June 6, 2020 ahead of the Tokyo 2020 Games as the Hibiya Line’s first new station in 56 years.",
        "isGhost": false
      },
      {
        "name": "Kasumigaseki (霞ケ関)",
        "lat": 35.6738,
        "lon": 139.7512,
        "x": -15.19,
        "z": 8.7,
        "year": 1964,
        "lines": [
          "M",
          "H",
          "C"
        ],
        "fact": "Connects with Marunouchi and Chiyoda lines.",
        "isGhost": false
      },
      {
        "name": "Hibiya (日比谷)",
        "lat": 35.6749,
        "lon": 139.7598,
        "x": -6.98,
        "z": 7.41,
        "year": 1964,
        "lines": [
          "H",
          "C",
          "I"
        ],
        "fact": "Borders the southeastern moat of the Imperial Palace and Hibiya Park.",
        "isGhost": false
      },
      {
        "name": "Ginza (銀座)",
        "lat": 35.6712,
        "lon": 139.765,
        "x": -2.01,
        "z": 11.76,
        "year": 1964,
        "lines": [
          "G",
          "M",
          "H"
        ],
        "fact": "Completed the full Hibiya Line in August 1964 just weeks before the Tokyo Olympics.",
        "isGhost": false
      },
      {
        "name": "Tsukiji (築地)",
        "lat": 35.668,
        "lon": 139.7725,
        "x": 5.16,
        "z": 15.52,
        "year": 1963,
        "lines": [
          "H"
        ],
        "fact": "Adjacent to Chūta Itō’s Indian-inspired 1934 Tsukiji Hongwanji Buddhist temple.",
        "isGhost": false
      },
      {
        "name": "Kayabacho",
        "lat": 35.6798,
        "lon": 139.78,
        "x": 12.33,
        "z": 1.65,
        "year": 1963,
        "lines": [
          "H",
          "T"
        ],
        "fact": "Serves the Tokyo Stock Exchange (Kabutocho).",
        "isGhost": false
      },
      {
        "name": "Akihabara (秋葉原)",
        "lat": 35.6984,
        "lon": 139.7731,
        "x": 5.73,
        "z": -20.23,
        "year": 1962,
        "lines": [
          "H",
          "JY",
          "JB"
        ],
        "fact": "World-renowned electronics and anime hub.",
        "isGhost": false
      },
      {
        "name": "Ueno (上野)",
        "lat": 35.7115,
        "lon": 139.776,
        "x": 8.5,
        "z": -35.63,
        "year": 1961,
        "lines": [
          "G",
          "H",
          "JY"
        ],
        "fact": "Connects with the Ginza Line, JR Yamanote, and Shinkansen.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "T",
    "name": "Tozai Line (東西線) — Iidabashi ↔ Takebashi ↔ Otemachi ↔ Nihombashi ↔ Monzen-Nakacho",
    "color": "#009bbf",
    "textColor": "#ffffff",
    "openedYear": 1964,
    "rollingStockStyle": "Eidan / Tokyo Metro (Sky-Blue High-Capacity Express)",
    "stations": [
      {
        "name": "Kagurazaka (神楽坂)",
        "lat": 35.7038,
        "lon": 139.7345,
        "x": -31.15,
        "z": -26.58,
        "year": 1964,
        "lines": [
          "T"
        ],
        "fact": "Stacked single-track tunnels beneath the cobblestone slopes of Kagurazaka.",
        "isGhost": false
      },
      {
        "name": "Iidabashi (飯田橋)",
        "lat": 35.7018,
        "lon": 139.7452,
        "x": -20.93,
        "z": -24.23,
        "year": 1964,
        "lines": [
          "T",
          "Y",
          "N",
          "E",
          "JB"
        ],
        "fact": "Major junction at the northwestern corner of the outer Edo Castle moat.",
        "isGhost": false
      },
      {
        "name": "Kudanshita (九段下)",
        "lat": 35.6955,
        "lon": 139.7512,
        "x": -15.19,
        "z": -16.82,
        "year": 1964,
        "lines": [
          "T",
          "Z",
          "S"
        ],
        "fact": "Serves the 1964 Nippon Budokan martial arts hall and Chidorigafuchi cherry-blossom moat.",
        "isGhost": false
      },
      {
        "name": "Takebashi (竹橋)",
        "lat": 35.6905,
        "lon": 139.7575,
        "x": -9.17,
        "z": -10.94,
        "year": 1966,
        "lines": [
          "T"
        ],
        "fact": "Directly overlooks the Hirakawa-mon gate of the Imperial Palace.",
        "isGhost": false
      },
      {
        "name": "Otemachi (大手町)",
        "lat": 35.6868,
        "lon": 139.7658,
        "x": -1.24,
        "z": -6.59,
        "year": 1966,
        "lines": [
          "M",
          "T",
          "C",
          "Z",
          "I"
        ],
        "fact": "Connects Marunouchi, Chiyoda, Hanzomon, and Mita lines.",
        "isGhost": false
      },
      {
        "name": "Nihombashi (日本橋)",
        "lat": 35.6822,
        "lon": 139.7736,
        "x": 6.21,
        "z": -1.18,
        "year": 1967,
        "lines": [
          "G",
          "T",
          "A"
        ],
        "fact": "Historic mercantile center.",
        "isGhost": false
      },
      {
        "name": "Kayabacho",
        "lat": 35.6798,
        "lon": 139.78,
        "x": 12.33,
        "z": 1.65,
        "year": 1967,
        "lines": [
          "H",
          "T"
        ],
        "fact": "Last stop before diving beneath the Sumida River.",
        "isGhost": false
      },
      {
        "name": "Monzen-Nakacho (門前仲町)",
        "lat": 35.6718,
        "lon": 139.7962,
        "x": 27.81,
        "z": 11.06,
        "year": 1967,
        "lines": [
          "T",
          "E"
        ],
        "fact": "Historic Edo waterfront neighborhood east of the Sumida River.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "C",
    "name": "Chiyoda Line (千代田線) — Meiji-jingumae ↔ Omotesando ↔ Hibiya ↔ Otemachi ↔ Nezu",
    "color": "#00bb85",
    "textColor": "#ffffff",
    "openedYear": 1969,
    "rollingStockStyle": "Eidan / Tokyo Metro (16000 Series Emerald)",
    "stations": [
      {
        "name": "Meiji-jingumae \"Harajuku\" (明治神宮前)",
        "lat": 35.6688,
        "lon": 139.7052,
        "x": -59.15,
        "z": 14.58,
        "year": 1972,
        "lines": [
          "C",
          "F"
        ],
        "fact": "Steps from the Grand Torii gate of Meiji Jingu and Harajuku’s Takeshita Street.",
        "isGhost": false
      },
      {
        "name": "Omotesando (表参道)",
        "lat": 35.6652,
        "lon": 139.7123,
        "x": -52.37,
        "z": 18.82,
        "year": 1972,
        "lines": [
          "G",
          "C",
          "Z"
        ],
        "fact": "Serves the architectural showpieces of Aoyama and Omotesando.",
        "isGhost": false
      },
      {
        "name": "Nogizaka",
        "lat": 35.6666,
        "lon": 139.7265,
        "x": -38.8,
        "z": 17.17,
        "year": 1972,
        "lines": [
          "C"
        ],
        "fact": "Direct access to the undulating glass facade of the National Art Center, Tokyo.",
        "isGhost": false
      },
      {
        "name": "Akasaka (赤坂)",
        "lat": 35.6722,
        "lon": 139.7362,
        "x": -29.53,
        "z": 10.58,
        "year": 1972,
        "lines": [
          "C"
        ],
        "fact": "Entertainment and diplomatic quarter.",
        "isGhost": false
      },
      {
        "name": "Kokkai-gijidomae (National Diet)",
        "lat": 35.6748,
        "lon": 139.7452,
        "x": -20.93,
        "z": 7.53,
        "year": 1972,
        "lines": [
          "M",
          "C"
        ],
        "fact": "Excavated below the Prime Minister’s Residence and Diet.",
        "isGhost": false
      },
      {
        "name": "Kasumigaseki",
        "lat": 35.6738,
        "lon": 139.7512,
        "x": -15.19,
        "z": 8.7,
        "year": 1971,
        "lines": [
          "M",
          "H",
          "C"
        ],
        "fact": "Interchange with Marunouchi and Hibiya lines.",
        "isGhost": false
      },
      {
        "name": "Hibiya",
        "lat": 35.6749,
        "lon": 139.7598,
        "x": -6.98,
        "z": 7.41,
        "year": 1971,
        "lines": [
          "H",
          "C",
          "I"
        ],
        "fact": "Connects with Hibiya and Mita lines.",
        "isGhost": false
      },
      {
        "name": "Nijūbashimae \"Marunouchi\" (二重橋前)",
        "lat": 35.6805,
        "lon": 139.7615,
        "x": -5.35,
        "z": 0.82,
        "year": 1971,
        "lines": [
          "C"
        ],
        "fact": "Opens directly onto the pine-dotted Kokyo Gaien plaza in front of the Imperial Palace’s Nijūbashi bridge.",
        "isGhost": false
      },
      {
        "name": "Otemachi (大手町)",
        "lat": 35.6868,
        "lon": 139.7658,
        "x": -1.24,
        "z": -6.59,
        "year": 1969,
        "lines": [
          "M",
          "T",
          "C",
          "Z",
          "I"
        ],
        "fact": "Inaugural 1969 southern anchor of the Chiyoda Line.",
        "isGhost": false
      },
      {
        "name": "Shin-Ochanomizu",
        "lat": 35.6969,
        "lon": 139.7655,
        "x": -1.53,
        "z": -18.46,
        "year": 1969,
        "lines": [
          "C"
        ],
        "fact": "Connected underground to Awajicho and Ogawamachi.",
        "isGhost": false
      },
      {
        "name": "Yushima",
        "lat": 35.7072,
        "lon": 139.7698,
        "x": 2.58,
        "z": -30.58,
        "year": 1969,
        "lines": [
          "C"
        ],
        "fact": "Borders the western shore of Ueno’s Shinobazu Pond.",
        "isGhost": false
      },
      {
        "name": "Nezu (根津)",
        "lat": 35.7175,
        "lon": 139.7658,
        "x": -1.24,
        "z": -42.69,
        "year": 1969,
        "lines": [
          "C"
        ],
        "fact": "Gateway to the preserved wooden Edo-Taishō neighborhood of Yanaka-Nezu-Sendagi (Yanesen).",
        "isGhost": false
      }
    ]
  },
  {
    "line": "Y",
    "name": "Yurakucho Line (有楽町線) — Ikebukuro ↔ Iidabashi ↔ Nagatacho ↔ Yurakucho ↔ Tsukishima ↔ Toyosu",
    "color": "#c1a470",
    "textColor": "#10141c",
    "openedYear": 1974,
    "rollingStockStyle": "Eidan / Tokyo Metro (10000 Series Champagne Gold)",
    "stations": [
      {
        "name": "Ikebukuro (池袋)",
        "lat": 35.7295,
        "lon": 139.7109,
        "x": -53.7,
        "z": -56.8,
        "year": 1974,
        "lines": [
          "M",
          "Y",
          "F",
          "JY"
        ],
        "fact": "Inaugural 1974 northwestern anchor of the Yurakucho Line.",
        "isGhost": false
      },
      {
        "name": "Higashi-Ikebukuro (東池袋 • Sunshine 60)",
        "lat": 35.7262,
        "lon": 139.7188,
        "x": -46.15,
        "z": -52.92,
        "year": 1974,
        "lines": [
          "Y"
        ],
        "fact": "Directly connected to the 240m Sunshine 60 tower.",
        "isGhost": false
      },
      {
        "name": "Gokokuji (護国寺)",
        "lat": 35.7192,
        "lon": 139.7272,
        "x": -38.13,
        "z": -44.69,
        "year": 1974,
        "lines": [
          "Y"
        ],
        "fact": "Beneath the monumental wooden gate of Gokoku-ji Temple.",
        "isGhost": false
      },
      {
        "name": "Edogawabashi",
        "lat": 35.7092,
        "lon": 139.7342,
        "x": -31.44,
        "z": -32.93,
        "year": 1974,
        "lines": [
          "Y"
        ],
        "fact": "Follows the cherry-blossom-lined Kanda River.",
        "isGhost": false
      },
      {
        "name": "Iidabashi (飯田橋)",
        "lat": 35.7018,
        "lon": 139.7452,
        "x": -20.93,
        "z": -24.23,
        "year": 1974,
        "lines": [
          "T",
          "Y",
          "N",
          "E",
          "JB"
        ],
        "fact": "Crosses the outer moat of Edo Castle.",
        "isGhost": false
      },
      {
        "name": "Ichigaya (市ケ谷)",
        "lat": 35.6915,
        "lon": 139.7358,
        "x": -29.91,
        "z": -12.11,
        "year": 1974,
        "lines": [
          "Y",
          "N",
          "S",
          "JB"
        ],
        "fact": "Overlooks the historic Sotobori moat fishing ponds.",
        "isGhost": false
      },
      {
        "name": "Kojimachi (麹町)",
        "lat": 35.6842,
        "lon": 139.7375,
        "x": -28.29,
        "z": -3.53,
        "year": 1974,
        "lines": [
          "Y"
        ],
        "fact": "Runs beneath Shinjuku-dori in historic Kojimachi.",
        "isGhost": false
      },
      {
        "name": "Nagatacho (永田町)",
        "lat": 35.6785,
        "lon": 139.7402,
        "x": -25.71,
        "z": 3.18,
        "year": 1974,
        "lines": [
          "Y",
          "Z",
          "N"
        ],
        "fact": "Adjacent to the National Diet Library and Supreme Court of Japan.",
        "isGhost": false
      },
      {
        "name": "Sakuradamon (桜田門 • Imperial Palace South Gate)",
        "lat": 35.6772,
        "lon": 139.7518,
        "x": -14.62,
        "z": 4.7,
        "year": 1974,
        "lines": [
          "Y"
        ],
        "fact": "Exits directly in front of the historic 1620 Sakuradamon gate and the Imperial Palace outer moat.",
        "isGhost": false
      },
      {
        "name": "Yurakucho (有楽町 • Tokyo International Forum)",
        "lat": 35.6751,
        "lon": 139.7633,
        "x": -3.63,
        "z": 7.17,
        "year": 1974,
        "lines": [
          "Y",
          "JY"
        ],
        "fact": "Directly connected to Rafael Viñoly’s soaring glass-and-steel Tokyo International Forum.",
        "isGhost": false
      },
      {
        "name": "Ginza-itchome (銀座一丁目)",
        "lat": 35.6742,
        "lon": 139.7672,
        "x": 0.1,
        "z": 8.23,
        "year": 1974,
        "lines": [
          "Y"
        ],
        "fact": "Serves the northern luxury shopping blocks of Ginza.",
        "isGhost": false
      },
      {
        "name": "Shintomicho",
        "lat": 35.6705,
        "lon": 139.7738,
        "x": 6.4,
        "z": 12.58,
        "year": 1980,
        "lines": [
          "Y"
        ],
        "fact": "Linked via transfer passage to Tsukiji Station on the Hibiya Line.",
        "isGhost": false
      },
      {
        "name": "Tsukishima (月島)",
        "lat": 35.6645,
        "lon": 139.7838,
        "x": 15.96,
        "z": 19.64,
        "year": 1988,
        "lines": [
          "Y",
          "E"
        ],
        "fact": "Crosses beneath the Sumida River to Tsukishima Island.",
        "isGhost": false
      },
      {
        "name": "Toyosu (豊洲 • Tokyo Bay Waterfront Hub)",
        "lat": 35.6552,
        "lon": 139.7962,
        "x": 27.81,
        "z": 30.58,
        "year": 1988,
        "lines": [
          "Y",
          "U"
        ],
        "fact": "Major waterfront interchange with the elevated Yurikamome line to Toyosu Market and Odaiba.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "Z",
    "name": "Hanzomon Line (半蔵門線) — Shibuya ↔ Omotesando ↔ Otemachi ↔ Mitsukoshimae ↔ Oshiage (Skytree)",
    "color": "#8f76d6",
    "textColor": "#ffffff",
    "openedYear": 1978,
    "rollingStockStyle": "Eidan / Tokyo Metro (18000 Series Imperial Purple)",
    "stations": [
      {
        "name": "Shibuya (渋谷)",
        "lat": 35.6588,
        "lon": 139.7016,
        "x": -62.59,
        "z": 26.34,
        "year": 1978,
        "lines": [
          "G",
          "Z",
          "F",
          "JY"
        ],
        "fact": "Trains run seamlessly west into the Tokyu Den-en-toshi Line.",
        "isGhost": false
      },
      {
        "name": "Omotesando (表参道)",
        "lat": 35.6652,
        "lon": 139.7123,
        "x": -52.37,
        "z": 18.82,
        "year": 1978,
        "lines": [
          "G",
          "C",
          "Z"
        ],
        "fact": "Same-direction cross-platform transfer with Line G.",
        "isGhost": false
      },
      {
        "name": "Aoyama-itchome",
        "lat": 35.6728,
        "lon": 139.7242,
        "x": -40.99,
        "z": 9.88,
        "year": 1978,
        "lines": [
          "Z",
          "E"
        ],
        "fact": "Serves the golden ginkgo-lined avenue of Meiji Jingu Gaien.",
        "isGhost": false
      },
      {
        "name": "Nagatacho (永田町)",
        "lat": 35.6785,
        "lon": 139.7402,
        "x": -25.71,
        "z": 3.18,
        "year": 1979,
        "lines": [
          "Y",
          "Z",
          "N"
        ],
        "fact": "Linked via underground walkways to Akasaka-mitsuke.",
        "isGhost": false
      },
      {
        "name": "Hanzomon (半蔵門)",
        "lat": 35.6855,
        "lon": 139.7418,
        "x": -24.18,
        "z": -5.06,
        "year": 1982,
        "lines": [
          "Z"
        ],
        "fact": "Named after legendary ninja commander Hattori Hanzō, who guarded the western gate of Edo Castle.",
        "isGhost": false
      },
      {
        "name": "Kudanshita (九段下)",
        "lat": 35.6955,
        "lon": 139.7512,
        "x": -15.19,
        "z": -16.82,
        "year": 1989,
        "lines": [
          "T",
          "Z",
          "S"
        ],
        "fact": "Features a famous unified cross-operator concourse with the Toei Shinjuku Line.",
        "isGhost": false
      },
      {
        "name": "Jimbocho (神保町)",
        "lat": 35.6959,
        "lon": 139.7578,
        "x": -8.89,
        "z": -17.29,
        "year": 1989,
        "lines": [
          "Z",
          "I",
          "S"
        ],
        "fact": "Heart of Tokyo’s historic antiquarian bookshop quarter.",
        "isGhost": false
      },
      {
        "name": "Otemachi (大手町)",
        "lat": 35.6868,
        "lon": 139.7658,
        "x": -1.24,
        "z": -6.59,
        "year": 1989,
        "lines": [
          "M",
          "T",
          "C",
          "Z",
          "I"
        ],
        "fact": "Central financial district.",
        "isGhost": false
      },
      {
        "name": "Mitsukoshimae (三越前)",
        "lat": 35.6849,
        "lon": 139.7732,
        "x": 5.83,
        "z": -4.35,
        "year": 1990,
        "lines": [
          "G",
          "Z"
        ],
        "fact": "Adjacent to Kingo Tatsuno’s 1896 Neoclassical Bank of Japan headquarters.",
        "isGhost": false
      },
      {
        "name": "Kiyosumi-shirakawa (清澄白河)",
        "lat": 35.6822,
        "lon": 139.7988,
        "x": 30.29,
        "z": -1.18,
        "year": 2003,
        "lines": [
          "Z",
          "E"
        ],
        "fact": "Serves the Meiji-era Kiyosumi landscape garden and Tokyo’s craft coffee roaster district.",
        "isGhost": false
      },
      {
        "name": "Kinshicho",
        "lat": 35.6962,
        "lon": 139.8142,
        "x": 45.01,
        "z": -17.64,
        "year": 2003,
        "lines": [
          "Z",
          "JB"
        ],
        "fact": "Major eastern Tokyo commercial center.",
        "isGhost": false
      },
      {
        "name": "Oshiage \"SKYTREE\" (押上〈スカイツリー前〉)",
        "lat": 35.7105,
        "lon": 139.8132,
        "x": 44.05,
        "z": -34.46,
        "year": 2003,
        "lines": [
          "Z",
          "A"
        ],
        "fact": "Four-company underground rail hub directly beneath the 634m Tokyo Skytree.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "N",
    "name": "Namboku Line (南北線) — Meguro ↔ Azabu-juban ↔ Roppongi-itchome ↔ Nagatacho ↔ Iidabashi ↔ Komagome",
    "color": "#00ac9b",
    "textColor": "#ffffff",
    "openedYear": 1991,
    "rollingStockStyle": "Teito Rapid Transit / Tokyo Metro (9000 Series Emerald-Teal Automated)",
    "stations": [
      {
        "name": "Meguro (目黒)",
        "lat": 35.6339,
        "lon": 139.7158,
        "x": -49.02,
        "z": 55.63,
        "year": 2000,
        "lines": [
          "N",
          "I",
          "JY"
        ],
        "fact": "Southern terminus shared seamlessly with the Toei Mita Line and Tokyu Meguro Line.",
        "isGhost": false
      },
      {
        "name": "Shirokanedai (白金台)",
        "lat": 35.6378,
        "lon": 139.7258,
        "x": -39.47,
        "z": 51.04,
        "year": 2000,
        "lines": [
          "N",
          "I"
        ],
        "fact": "Adjacent to the 1933 Art Deco Residence of Prince Asaka (Tokyo Metropolitan Teien Art Museum).",
        "isGhost": false
      },
      {
        "name": "Azabu-juban (麻布十番)",
        "lat": 35.6548,
        "lon": 139.7368,
        "x": -28.95,
        "z": 31.05,
        "year": 2000,
        "lines": [
          "N",
          "E"
        ],
        "fact": "Vibrant Azabu village streetscape with a deep transfer to the Toei Oedo Line.",
        "isGhost": false
      },
      {
        "name": "Roppongi-itchome (六本木一丁目)",
        "lat": 35.6656,
        "lon": 139.7388,
        "x": -27.04,
        "z": 18.35,
        "year": 2000,
        "lines": [
          "N"
        ],
        "fact": "Opens directly into the stepped glass canyon of Izumi Garden Tower and Suntory Hall.",
        "isGhost": false
      },
      {
        "name": "Tameike-sanno (溜池山王)",
        "lat": 35.6728,
        "lon": 139.7415,
        "x": -24.46,
        "z": 9.88,
        "year": 1997,
        "lines": [
          "N"
        ],
        "fact": "Serves the Prime Minister’s Kantei and the hillside torii stairs of Hie Shrine.",
        "isGhost": false
      },
      {
        "name": "Nagatacho (永田町)",
        "lat": 35.6785,
        "lon": 139.7402,
        "x": -25.71,
        "z": 3.18,
        "year": 1997,
        "lines": [
          "Y",
          "Z",
          "N"
        ],
        "fact": "Connects Namboku, Yurakucho, Hanzomon, Ginza, and Marunouchi lines.",
        "isGhost": false
      },
      {
        "name": "Yotsuya (四ツ谷)",
        "lat": 35.686,
        "lon": 139.7302,
        "x": -35.26,
        "z": -5.65,
        "year": 1996,
        "lines": [
          "M",
          "N",
          "JB"
        ],
        "fact": "Passes deep beneath the Marunouchi viaduct and JR Chuo tracks at Yotsuya.",
        "isGhost": false
      },
      {
        "name": "Ichigaya (市ケ谷)",
        "lat": 35.6915,
        "lon": 139.7358,
        "x": -29.91,
        "z": -12.11,
        "year": 1996,
        "lines": [
          "Y",
          "N",
          "S",
          "JB"
        ],
        "fact": "Interchange with Yurakucho, Toei Shinjuku, and JR Chuo-Sobu lines.",
        "isGhost": false
      },
      {
        "name": "Iidabashi (飯田橋)",
        "lat": 35.7018,
        "lon": 139.7452,
        "x": -20.93,
        "z": -24.23,
        "year": 1996,
        "lines": [
          "T",
          "Y",
          "N",
          "E",
          "JB"
        ],
        "fact": "Connects with Tozai, Yurakucho, Oedo, and JR lines.",
        "isGhost": false
      },
      {
        "name": "Korakuen (後楽園)",
        "lat": 35.7078,
        "lon": 139.7518,
        "x": -14.62,
        "z": -31.28,
        "year": 1996,
        "lines": [
          "M",
          "N"
        ],
        "fact": "Linked underground to Kasuga Station.",
        "isGhost": false
      },
      {
        "name": "Todaimae (東大前 • University of Tokyo)",
        "lat": 35.718,
        "lon": 139.7578,
        "x": -8.89,
        "z": -43.28,
        "year": 1996,
        "lines": [
          "N"
        ],
        "fact": "Steps from the University of Tokyo’s iconic Edo-period Akamon (Red Gate).",
        "isGhost": false
      },
      {
        "name": "Komagome (駒込 • Rikugien Gardens)",
        "lat": 35.7365,
        "lon": 139.7468,
        "x": -19.4,
        "z": -65.04,
        "year": 1991,
        "lines": [
          "N",
          "JY"
        ],
        "fact": "Serves the 1702 Edo feudal lord garden of Rikugien and transfers to the JR Yamanote Line.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "F",
    "name": "Fukutoshin Line (副都心線) — Ikebukuro ↔ Shinjuku-sanchome ↔ Meiji-jingumae ↔ Shibuya",
    "color": "#9c5e31",
    "textColor": "#ffffff",
    "openedYear": 2008,
    "rollingStockStyle": "Tokyo Metro (17000 Series Chestnut Express)",
    "stations": [
      {
        "name": "Ikebukuro (池袋)",
        "lat": 35.7295,
        "lon": 139.7109,
        "x": -53.7,
        "z": -56.8,
        "year": 2008,
        "lines": [
          "M",
          "Y",
          "F",
          "JY"
        ],
        "fact": "Connects with Tobu Tojo and Seibu Ikebukuro through-trains.",
        "isGhost": false
      },
      {
        "name": "Zoshigaya",
        "lat": 35.7202,
        "lon": 139.7148,
        "x": -49.98,
        "z": -45.87,
        "year": 2008,
        "lines": [
          "F"
        ],
        "fact": "Interchange with Tokyo’s last surviving vintage surface tramline (Tokyo Sakura Tram).",
        "isGhost": false
      },
      {
        "name": "Higashi-Shinjuku",
        "lat": 35.6995,
        "lon": 139.7075,
        "x": -56.95,
        "z": -21.52,
        "year": 2008,
        "lines": [
          "F",
          "E"
        ],
        "fact": "Equipped with passing tracks so F-Liner express trains overtake local trains.",
        "isGhost": false
      },
      {
        "name": "Shinjuku-sanchome (新宿三丁目)",
        "lat": 35.6908,
        "lon": 139.7062,
        "x": -58.2,
        "z": -11.29,
        "year": 2008,
        "lines": [
          "M",
          "F",
          "S"
        ],
        "fact": "Steps from Shinjuku Gyoen National Garden.",
        "isGhost": false
      },
      {
        "name": "Kitasando",
        "lat": 35.6785,
        "lon": 139.7055,
        "x": -58.86,
        "z": 3.18,
        "year": 2008,
        "lines": [
          "F"
        ],
        "fact": "Between Shinjuku Gyoen and Meiji Jingu.",
        "isGhost": false
      },
      {
        "name": "Meiji-jingumae \"Harajuku\" (明治神宮前)",
        "lat": 35.6688,
        "lon": 139.7052,
        "x": -59.15,
        "z": 14.58,
        "year": 2008,
        "lines": [
          "C",
          "F"
        ],
        "fact": "Interchange with the Chiyoda and JR Yamanote lines.",
        "isGhost": false
      },
      {
        "name": "Shibuya (渋谷 • Tadao Ando \"Chichūsen\" Spaceship)",
        "lat": 35.6588,
        "lon": 139.7016,
        "x": -62.59,
        "z": 26.34,
        "year": 2008,
        "lines": [
          "G",
          "Z",
          "F",
          "JY"
        ],
        "fact": "Designed by Pritzker Prize architect Tadao Ando as a giant naturally ventilated concrete egg suspended inside a subterranean atrium.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "A",
    "name": "Toei Asakusa Line (都営浅草線) — Sengakuji ↔ Mita ↔ Shimbashi ↔ Nihombashi ↔ Asakusa ↔ Oshiage",
    "color": "#e85298",
    "textColor": "#ffffff",
    "openedYear": 1960,
    "rollingStockStyle": "Tokyo Metropolitan Bureau of Transportation (Toei 5500 Series Kabuki Rose)",
    "stations": [
      {
        "name": "Sengakuji (泉岳寺)",
        "lat": 35.6388,
        "lon": 139.7402,
        "x": -25.71,
        "z": 49.87,
        "year": 1968,
        "lines": [
          "A"
        ],
        "fact": "Adjacent to Sengaku-ji Temple (resting place of the Forty-Seven Rōnin) and Takanawa Gateway.",
        "isGhost": false
      },
      {
        "name": "Mita (三田)",
        "lat": 35.6482,
        "lon": 139.7485,
        "x": -17.77,
        "z": 38.81,
        "year": 1968,
        "lines": [
          "A",
          "I"
        ],
        "fact": "Southern gateway to Shiba Park and Tokyo Tower.",
        "isGhost": false
      },
      {
        "name": "Daimon (大門 • Zojo-ji & Tokyo Tower)",
        "lat": 35.6568,
        "lon": 139.7542,
        "x": -12.33,
        "z": 28.7,
        "year": 1964,
        "lines": [
          "A",
          "E"
        ],
        "fact": "Named after the monumental 1622 Great Gate of Zōjō-ji Temple framing Tokyo Tower.",
        "isGhost": false
      },
      {
        "name": "Shimbashi (新橋)",
        "lat": 35.6664,
        "lon": 139.7583,
        "x": -8.41,
        "z": 17.41,
        "year": 1963,
        "lines": [
          "G",
          "A",
          "JY",
          "U"
        ],
        "fact": "Site of the original 1872 Shimbashi Railway Terminus.",
        "isGhost": false
      },
      {
        "name": "Higashi-Ginza (東銀座 • Kabukiza Theatre)",
        "lat": 35.6695,
        "lon": 139.7675,
        "x": 0.38,
        "z": 13.76,
        "year": 1963,
        "lines": [
          "A"
        ],
        "fact": "Decorated with traditional Kabuki motifs and connected directly beneath Kengo Kuma’s rebuilt Kabukiza Theatre.",
        "isGhost": false
      },
      {
        "name": "Nihombashi (日本橋)",
        "lat": 35.6822,
        "lon": 139.7736,
        "x": 6.21,
        "z": -1.18,
        "year": 1963,
        "lines": [
          "G",
          "T",
          "A"
        ],
        "fact": "Connects with Ginza and Tozai lines.",
        "isGhost": false
      },
      {
        "name": "Asakusabashi",
        "lat": 35.6975,
        "lon": 139.7862,
        "x": 18.25,
        "z": -19.17,
        "year": 1962,
        "lines": [
          "A",
          "JB"
        ],
        "fact": "Where the Kanda River meets the Sumida River.",
        "isGhost": false
      },
      {
        "name": "Kuramae",
        "lat": 35.7035,
        "lon": 139.7908,
        "x": 22.65,
        "z": -26.23,
        "year": 1960,
        "lines": [
          "A",
          "E"
        ],
        "fact": "Tokyo’s artisanal leather and craft quarter.",
        "isGhost": false
      },
      {
        "name": "Asakusa (浅草)",
        "lat": 35.7105,
        "lon": 139.7968,
        "x": 28.38,
        "z": -34.46,
        "year": 1960,
        "lines": [
          "G",
          "A"
        ],
        "fact": "Connects with the Ginza Line and Tobu Skytree Line.",
        "isGhost": false
      },
      {
        "name": "Oshiage \"SKYTREE\" (押上)",
        "lat": 35.7105,
        "lon": 139.8132,
        "x": 44.05,
        "z": -34.46,
        "year": 1960,
        "lines": [
          "Z",
          "A"
        ],
        "fact": "Site of Japan’s first subway-to-private-railway through-service on December 4, 1960.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "I",
    "name": "Toei Mita Line (都営三田線) — Meguro ↔ Mita ↔ Onarimon (Tokyo Tower) ↔ Hibiya ↔ Otemachi ↔ Jimbocho ↔ Sugamo",
    "color": "#006cb6",
    "textColor": "#ffffff",
    "openedYear": 1968,
    "rollingStockStyle": "Toei Subway (6500 Series Royal Blue)",
    "stations": [
      {
        "name": "Meguro (目黒)",
        "lat": 35.6339,
        "lon": 139.7158,
        "x": -49.02,
        "z": 55.63,
        "year": 2000,
        "lines": [
          "N",
          "I",
          "JY"
        ],
        "fact": "Shared four-track island platform hub with the Tokyo Metro Namboku Line.",
        "isGhost": false
      },
      {
        "name": "Shirokanedai (白金台)",
        "lat": 35.6378,
        "lon": 139.7258,
        "x": -39.47,
        "z": 51.04,
        "year": 2000,
        "lines": [
          "N",
          "I"
        ],
        "fact": "Serves the Shirokane plateau.",
        "isGhost": false
      },
      {
        "name": "Mita (三田)",
        "lat": 35.6482,
        "lon": 139.7485,
        "x": -17.77,
        "z": 38.81,
        "year": 1973,
        "lines": [
          "A",
          "I"
        ],
        "fact": "Connects directly with the Toei Asakusa Line and JR Tamachi Station.",
        "isGhost": false
      },
      {
        "name": "Shibakoen (芝公園 • Tokyo Tower East)",
        "lat": 35.6542,
        "lon": 139.7498,
        "x": -16.53,
        "z": 31.75,
        "year": 1973,
        "lines": [
          "I"
        ],
        "fact": "Opens directly into the cedar groves of Shiba Park at the foot of Tokyo Tower.",
        "isGhost": false
      },
      {
        "name": "Onarimon (御成門 • Tokyo Tower North)",
        "lat": 35.6612,
        "lon": 139.7515,
        "x": -14.91,
        "z": 23.52,
        "year": 1973,
        "lines": [
          "I"
        ],
        "fact": "Named after the historic gate built for the Tokugawa Shogun’s visits to Zōjō-ji.",
        "isGhost": false
      },
      {
        "name": "Uchisaiwaicho",
        "lat": 35.6695,
        "lon": 139.7558,
        "x": -10.8,
        "z": 13.76,
        "year": 1973,
        "lines": [
          "I"
        ],
        "fact": "Southern approach to Hibiya Park.",
        "isGhost": false
      },
      {
        "name": "Hibiya (日比谷)",
        "lat": 35.6749,
        "lon": 139.7598,
        "x": -6.98,
        "z": 7.41,
        "year": 1972,
        "lines": [
          "H",
          "C",
          "I"
        ],
        "fact": "Runs along the Babasakimon moat of the Imperial Palace.",
        "isGhost": false
      },
      {
        "name": "Otemachi (大手町)",
        "lat": 35.6868,
        "lon": 139.7658,
        "x": -1.24,
        "z": -6.59,
        "year": 1972,
        "lines": [
          "M",
          "T",
          "C",
          "Z",
          "I"
        ],
        "fact": "Financial district interchange.",
        "isGhost": false
      },
      {
        "name": "Jimbocho (神保町)",
        "lat": 35.6959,
        "lon": 139.7578,
        "x": -8.89,
        "z": -17.29,
        "year": 1972,
        "lines": [
          "Z",
          "I",
          "S"
        ],
        "fact": "Crosses the Toei Shinjuku and Hanzomon lines beneath Yasukuni-dori.",
        "isGhost": false
      },
      {
        "name": "Suidobashi (水道橋 • Tokyo Dome)",
        "lat": 35.7032,
        "lon": 139.7538,
        "x": -12.71,
        "z": -25.87,
        "year": 1972,
        "lines": [
          "I",
          "JB"
        ],
        "fact": "Named after the 17th-century Kanda Josui wooden aqueduct bridge.",
        "isGhost": false
      },
      {
        "name": "Kasuga (春日)",
        "lat": 35.7092,
        "lon": 139.7532,
        "x": -13.28,
        "z": -32.93,
        "year": 1968,
        "lines": [
          "I",
          "E"
        ],
        "fact": "Connected directly to Korakuen Station.",
        "isGhost": false
      },
      {
        "name": "Sugamo (巣鴨 • Togenuki Jizo)",
        "lat": 35.7335,
        "lon": 139.7392,
        "x": -26.66,
        "z": -61.51,
        "year": 1968,
        "lines": [
          "I",
          "JY"
        ],
        "fact": "Famous for the historic Jizō-dōri shopping street and Kōgan-ji Temple.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "S",
    "name": "Toei Shinjuku Line (都営新宿線) — Shinjuku ↔ Ichigaya ↔ Kudanshita ↔ Jimbocho ↔ Iwamotocho (Akihabara) ↔ Morishita",
    "color": "#b0bf1e",
    "textColor": "#10141c",
    "openedYear": 1978,
    "rollingStockStyle": "Toei Subway (10-300 Series Leaf Green Express)",
    "stations": [
      {
        "name": "Shinjuku (新宿)",
        "lat": 35.69,
        "lon": 139.7004,
        "x": -63.74,
        "z": -10.35,
        "year": 1980,
        "lines": [
          "M",
          "S",
          "E",
          "JY",
          "JB"
        ],
        "fact": "Western anchor with direct express through-running onto the Keio Line toward Mount Takao.",
        "isGhost": false
      },
      {
        "name": "Shinjuku-sanchome (新宿三丁目)",
        "lat": 35.6908,
        "lon": 139.7062,
        "x": -58.2,
        "z": -11.29,
        "year": 1980,
        "lines": [
          "M",
          "F",
          "S"
        ],
        "fact": "Beneath Shinjuku-dori and Yasukuni-dori.",
        "isGhost": false
      },
      {
        "name": "Akebonobashi",
        "lat": 35.6928,
        "lon": 139.7228,
        "x": -42.33,
        "z": -13.64,
        "year": 1980,
        "lines": [
          "S"
        ],
        "fact": "Serves the Ichigaya defense and residential hills.",
        "isGhost": false
      },
      {
        "name": "Ichigaya (市ケ谷)",
        "lat": 35.6915,
        "lon": 139.7358,
        "x": -29.91,
        "z": -12.11,
        "year": 1980,
        "lines": [
          "Y",
          "N",
          "S",
          "JB"
        ],
        "fact": "Crosses the outer Edo Castle moat.",
        "isGhost": false
      },
      {
        "name": "Kudanshita (九段下)",
        "lat": 35.6955,
        "lon": 139.7512,
        "x": -15.19,
        "z": -16.82,
        "year": 1980,
        "lines": [
          "T",
          "Z",
          "S"
        ],
        "fact": "Famous for the 2013 removal of the dividing wall between Toei and Tokyo Metro platforms.",
        "isGhost": false
      },
      {
        "name": "Jimbocho (神保町)",
        "lat": 35.6959,
        "lon": 139.7578,
        "x": -8.89,
        "z": -17.29,
        "year": 1980,
        "lines": [
          "Z",
          "I",
          "S"
        ],
        "fact": "Major three-line transfer beneath Yasukuni-dori.",
        "isGhost": false
      },
      {
        "name": "Ogawamachi (小川町)",
        "lat": 35.6952,
        "lon": 139.7668,
        "x": -0.29,
        "z": -16.46,
        "year": 1980,
        "lines": [
          "S"
        ],
        "fact": "Connected via subterranean passages to Awajicho (Marunouchi) and Shin-Ochanomizu (Chiyoda).",
        "isGhost": false
      },
      {
        "name": "Iwamotocho (岩本町 • Akihabara South)",
        "lat": 35.6958,
        "lon": 139.7758,
        "x": 8.31,
        "z": -17.17,
        "year": 1978,
        "lines": [
          "S"
        ],
        "fact": "Inaugural 1978 western terminus, steps from Akihabara Electric Town.",
        "isGhost": false
      },
      {
        "name": "Bakuro-yokoyama",
        "lat": 35.6922,
        "lon": 139.7845,
        "x": 16.63,
        "z": -12.94,
        "year": 1978,
        "lines": [
          "S"
        ],
        "fact": "Connected underground to Higashi-nihombashi (Asakusa Line) and Bakurocho (JR Sobu Rapid).",
        "isGhost": false
      },
      {
        "name": "Hamacho (浜町)",
        "lat": 35.6882,
        "lon": 139.7895,
        "x": 21.41,
        "z": -8.23,
        "year": 1978,
        "lines": [
          "S"
        ],
        "fact": "Situated beneath Hamacho Park on the western bank of the Sumida River.",
        "isGhost": false
      },
      {
        "name": "Morishita (森下)",
        "lat": 35.688,
        "lon": 139.7988,
        "x": 30.29,
        "z": -8,
        "year": 1978,
        "lines": [
          "S",
          "E"
        ],
        "fact": "Major Toei-to-Toei transfer hub east of the Sumida River.",
        "isGhost": false
      },
      {
        "name": "Sumiyoshi (住吉)",
        "lat": 35.6892,
        "lon": 139.8158,
        "x": 46.54,
        "z": -9.41,
        "year": 1978,
        "lines": [
          "S"
        ],
        "fact": "Connects with the Hanzomon Line toward Oshiage (Tokyo Skytree).",
        "isGhost": false
      }
    ]
  },
  {
    "line": "E",
    "name": "Toei Oedo Line (都営大江戸線) — Nerima ↔ Tochomae (Shinjuku) ↔ Roppongi ↔ Daimon ↔ Tsukishima ↔ Ryogoku ↔ Iidabashi ↔ Tochomae Figure-6 Loop",
    "color": "#ce045b",
    "textColor": "#ffffff",
    "openedYear": 2000,
    "rollingStockStyle": "Toei Subway (12-600 Series Linear-Motor Ruby Magenta)",
    "stations": [
      {
        "name": "Nerima (練馬)",
        "lat": 35.7378,
        "lon": 139.6542,
        "x": -110.81,
        "z": -68.37,
        "year": 1991,
        "lines": [
          "E"
        ],
        "fact": "Part of the original December 10, 1991 Hikarigaoka–Nerima linear-motor opening.",
        "isGhost": false
      },
      {
        "name": "Higashi-Nakano (東中野)",
        "lat": 35.7062,
        "lon": 139.6858,
        "x": -79.15,
        "z": -29.95,
        "year": 1997,
        "lines": [
          "E",
          "JB"
        ],
        "fact": "Connects the northwestern Oedo branch with the JR Chuo-Sobu Line.",
        "isGhost": false
      },
      {
        "name": "Nakano-sakaue (中野坂上)",
        "lat": 35.697,
        "lon": 139.6828,
        "x": -81.86,
        "z": -18.88,
        "year": 1997,
        "lines": [
          "E"
        ],
        "fact": "Major western transfer with the Tokyo Metro Marunouchi Line.",
        "isGhost": false
      },
      {
        "name": "Nishi-shinjuku-gochome",
        "lat": 35.6902,
        "lon": 139.6838,
        "x": -79.6,
        "z": -10.58,
        "year": 1997,
        "lines": [
          "E"
        ],
        "fact": "Approaches the Tokyo Metropolitan Government complex from the west.",
        "isGhost": false
      },
      {
        "name": "Tochomae (都庁前 • Tokyo Metropolitan Govt)",
        "lat": 35.6897,
        "lon": 139.6922,
        "x": -71.57,
        "z": -10,
        "year": 1997,
        "lines": [
          "E"
        ],
        "fact": "Figure-6 loop junction directly beneath Kenzo Tange’s 243m cathedral-inspired Tokyo Metropolitan Government Building.",
        "isGhost": false
      },
      {
        "name": "Shinjuku (新宿)",
        "lat": 35.69,
        "lon": 139.7004,
        "x": -63.74,
        "z": -10.35,
        "year": 1997,
        "lines": [
          "M",
          "S",
          "E",
          "JY",
          "JB"
        ],
        "fact": "Deep linear-motor platforms beneath the southern concourse of Shinjuku Station.",
        "isGhost": false
      },
      {
        "name": "Yoyogi (代々木)",
        "lat": 35.683,
        "lon": 139.702,
        "x": -62.21,
        "z": -2.12,
        "year": 2000,
        "lines": [
          "E",
          "JY",
          "JB"
        ],
        "fact": "Southern gateway to Shinjuku and northern edge of Meiji Jingu.",
        "isGhost": false
      },
      {
        "name": "Kokuritsu-kyogijo (Japan National Stadium)",
        "lat": 35.6798,
        "lon": 139.7145,
        "x": -50.26,
        "z": 1.65,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Serves Kengo Kuma’s timber-latticed Japan National Stadium.",
        "isGhost": false
      },
      {
        "name": "Aoyama-itchome",
        "lat": 35.6728,
        "lon": 139.7242,
        "x": -40.99,
        "z": 9.88,
        "year": 2000,
        "lines": [
          "Z",
          "E"
        ],
        "fact": "Interchange with Ginza and Hanzomon lines.",
        "isGhost": false
      },
      {
        "name": "Roppongi (六本木 • Deepest Station at -42.3m)",
        "lat": 35.6628,
        "lon": 139.7314,
        "x": -34.11,
        "z": 21.64,
        "year": 2000,
        "lines": [
          "H",
          "E"
        ],
        "fact": "Stacked linear-motor tubes bored 42.3 meters below Roppongi Crossing.",
        "isGhost": false
      },
      {
        "name": "Azabu-juban (麻布十番)",
        "lat": 35.6548,
        "lon": 139.7368,
        "x": -28.95,
        "z": 31.05,
        "year": 2000,
        "lines": [
          "N",
          "E"
        ],
        "fact": "Serves the historic Azabu-juban shopping district and Roppongi Keyakizaka.",
        "isGhost": false
      },
      {
        "name": "Akabanebashi (赤羽橋 • Tokyo Tower Foot)",
        "lat": 35.655,
        "lon": 139.7438,
        "x": -22.27,
        "z": 30.81,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Emerges directly at the southern foot of Shiba Park with an unobstructed vertical view of Tokyo Tower.",
        "isGhost": false
      },
      {
        "name": "Daimon (大門)",
        "lat": 35.6568,
        "lon": 139.7542,
        "x": -12.33,
        "z": 28.7,
        "year": 2000,
        "lines": [
          "A",
          "E"
        ],
        "fact": "Connects with the Toei Asakusa Line, Tokyo Monorail to Haneda, and JR Hamamatsucho.",
        "isGhost": false
      },
      {
        "name": "Shiodome (汐留)",
        "lat": 35.6628,
        "lon": 139.7602,
        "x": -6.59,
        "z": 21.64,
        "year": 2002,
        "lines": [
          "E",
          "U"
        ],
        "fact": "Direct transfer to the automated Yurikamome line across the Rainbow Bridge to Odaiba.",
        "isGhost": false
      },
      {
        "name": "Kachidoki (勝どき)",
        "lat": 35.659,
        "lon": 139.7768,
        "x": 9.27,
        "z": 26.11,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Serves the historic Kachidoki Bridge across the mouth of the Sumida River.",
        "isGhost": false
      },
      {
        "name": "Tsukishima (月島)",
        "lat": 35.6645,
        "lon": 139.7838,
        "x": 15.96,
        "z": 19.64,
        "year": 2000,
        "lines": [
          "Y",
          "E"
        ],
        "fact": "Reclaimed island famous for Monjayaki alleys and historic wooden rowhouses.",
        "isGhost": false
      },
      {
        "name": "Monzen-Nakacho",
        "lat": 35.6718,
        "lon": 139.7962,
        "x": 27.81,
        "z": 11.06,
        "year": 2000,
        "lines": [
          "T",
          "E"
        ],
        "fact": "Historic Fukagawa hub.",
        "isGhost": false
      },
      {
        "name": "Kiyosumi-shirakawa",
        "lat": 35.6822,
        "lon": 139.7988,
        "x": 30.29,
        "z": -1.18,
        "year": 2000,
        "lines": [
          "Z",
          "E"
        ],
        "fact": "Museum and garden district.",
        "isGhost": false
      },
      {
        "name": "Morishita (森下)",
        "lat": 35.688,
        "lon": 139.7988,
        "x": 30.29,
        "z": -8,
        "year": 2000,
        "lines": [
          "S",
          "E"
        ],
        "fact": "Connects with the Toei Shinjuku Line.",
        "isGhost": false
      },
      {
        "name": "Ryogoku (両国 • Sumo & Edo-Tokyo Museum)",
        "lat": 35.6968,
        "lon": 139.7938,
        "x": 25.51,
        "z": -18.35,
        "year": 2000,
        "lines": [
          "E",
          "JB"
        ],
        "fact": "Heartland of Grand Sumo and Katsushika Hokusai’s birthplace.",
        "isGhost": false
      },
      {
        "name": "Kuramae",
        "lat": 35.7035,
        "lon": 139.7908,
        "x": 22.65,
        "z": -26.23,
        "year": 2000,
        "lines": [
          "A",
          "E"
        ],
        "fact": "Artisanal craft quarter along the Sumida River.",
        "isGhost": false
      },
      {
        "name": "Ueno-okachimachi",
        "lat": 35.7075,
        "lon": 139.7738,
        "x": 6.4,
        "z": -30.93,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Connected underground to Ueno-hirokoji (G) and Naka-okachimachi (H).",
        "isGhost": false
      },
      {
        "name": "Hongo-sanchome (本郷三丁目)",
        "lat": 35.7068,
        "lon": 139.7602,
        "x": -6.59,
        "z": -30.11,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Serves the University of Tokyo literary plateau.",
        "isGhost": false
      },
      {
        "name": "Kasuga (Korakuen)",
        "lat": 35.7092,
        "lon": 139.7532,
        "x": -13.28,
        "z": -32.93,
        "year": 2000,
        "lines": [
          "I",
          "E"
        ],
        "fact": "Beneath the Bunkyo Civic Center skydeck.",
        "isGhost": false
      },
      {
        "name": "Iidabashi (飯田橋 • Makoto Sei Watanabe Wing Canopy)",
        "lat": 35.7018,
        "lon": 139.7452,
        "x": -20.93,
        "z": -24.23,
        "year": 2000,
        "lines": [
          "T",
          "Y",
          "N",
          "E",
          "JB"
        ],
        "fact": "Winner of the Architectural Institute of Japan Prize for its organic emerald-green computer-generated structural web inside the escalator shaft.",
        "isGhost": false
      },
      {
        "name": "Ushigome-kagurazaka",
        "lat": 35.7008,
        "lon": 139.7358,
        "x": -29.91,
        "z": -23.05,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Serves the upper slopes of Kagurazaka.",
        "isGhost": false
      },
      {
        "name": "Higashi-Shinjuku",
        "lat": 35.6995,
        "lon": 139.7075,
        "x": -56.95,
        "z": -21.52,
        "year": 2000,
        "lines": [
          "F",
          "E"
        ],
        "fact": "Northern Shinjuku interchange with the Fukutoshin Line.",
        "isGhost": false
      },
      {
        "name": "Shinjuku-nishiguchi (新宿西口)",
        "lat": 35.6938,
        "lon": 139.6992,
        "x": -64.88,
        "z": -14.82,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Final northern loop station before returning to Tochomae to complete the Oedo Figure-6.",
        "isGhost": false
      },
      {
        "name": "Tochomae (都庁前 • Loop Closure)",
        "lat": 35.6897,
        "lon": 139.6922,
        "x": -71.57,
        "z": -10,
        "year": 2000,
        "lines": [
          "E"
        ],
        "fact": "Where the 28-station Oedo loop closes back onto itself beneath Tokyo City Hall.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "JY",
    "name": "JR Yamanote Line (JR山手線) — Tokyo ↔ Shinagawa ↔ Shibuya ↔ Shinjuku ↔ Ikebukuro ↔ Ueno Full Orbital Loop",
    "color": "#9acd32",
    "textColor": "#10141c",
    "openedYear": 1909,
    "rollingStockStyle": "Japanese Government Railways / JR East (E235 Series Lime-Green Loop)",
    "stations": [
      {
        "name": "Tokyo (東京)",
        "lat": 35.6812,
        "lon": 139.7671,
        "x": 0,
        "z": 0,
        "year": 1914,
        "lines": [
          "M",
          "JY"
        ],
        "fact": "Eastern anchor of the Yamanote loop.",
        "isGhost": false
      },
      {
        "name": "Yurakucho (有楽町)",
        "lat": 35.6751,
        "lon": 139.7633,
        "x": -3.63,
        "z": 7.17,
        "year": 1910,
        "lines": [
          "Y",
          "JY"
        ],
        "fact": "Elevated brick arches beside Ginza and the Tokyo International Forum.",
        "isGhost": false
      },
      {
        "name": "Shimbashi (新橋)",
        "lat": 35.6664,
        "lon": 139.7583,
        "x": -8.41,
        "z": 17.41,
        "year": 1909,
        "lines": [
          "G",
          "A",
          "JY",
          "U"
        ],
        "fact": "Runs atop the historic 1909 German-engineered red-brick railway arches.",
        "isGhost": false
      },
      {
        "name": "Hamamatsucho (浜松町)",
        "lat": 35.6554,
        "lon": 139.7571,
        "x": -9.56,
        "z": 30.34,
        "year": 1909,
        "lines": [
          "JY"
        ],
        "fact": "Overlooks Shiba Rikyu Gardens with views of both Tokyo Tower and Rainbow Bridge.",
        "isGhost": false
      },
      {
        "name": "Tamachi / Mita (田町)",
        "lat": 35.6457,
        "lon": 139.7476,
        "x": -18.63,
        "z": 41.75,
        "year": 1909,
        "lines": [
          "JY"
        ],
        "fact": "Adjacent to Mita Subway Station.",
        "isGhost": false
      },
      {
        "name": "Takanawa Gateway (高輪ゲートウェイ)",
        "lat": 35.6355,
        "lon": 139.7407,
        "x": -25.23,
        "z": 53.75,
        "year": 2020,
        "lines": [
          "JY"
        ],
        "fact": "Opened March 14, 2020 as the Yamanote Line’s 30th station; during construction, the 1872 Meiji offshore stone railway embankment was unearthed.",
        "isGhost": false
      },
      {
        "name": "Shinagawa (品川)",
        "lat": 35.6284,
        "lon": 139.7387,
        "x": -27.14,
        "z": 62.1,
        "year": 1872,
        "lines": [
          "JY"
        ],
        "fact": "One of Japan’s oldest railway stations (opened June 12, 1872) and future terminal of the Chuo Shinkansen Maglev.",
        "isGhost": false
      },
      {
        "name": "Osaki (大崎)",
        "lat": 35.6197,
        "lon": 139.7285,
        "x": -37.08,
        "z": 72.7,
        "year": 1901,
        "lines": [
          "JY"
        ],
        "fact": "Southernmost station on the Yamanote loop.",
        "isGhost": false
      },
      {
        "name": "Meguro (目黒)",
        "lat": 35.6339,
        "lon": 139.7158,
        "x": -49.02,
        "z": 55.63,
        "year": 1885,
        "lines": [
          "N",
          "I",
          "JY"
        ],
        "fact": "Interchange with the Namboku and Toei Mita subway lines.",
        "isGhost": false
      },
      {
        "name": "Ebisu (恵比寿)",
        "lat": 35.6467,
        "lon": 139.7101,
        "x": -54.47,
        "z": 40.57,
        "year": 1901,
        "lines": [
          "H",
          "JY"
        ],
        "fact": "Opened in 1901 as a freight depot for Yebisu Beer.",
        "isGhost": false
      },
      {
        "name": "Shibuya (渋谷)",
        "lat": 35.6588,
        "lon": 139.7016,
        "x": -62.59,
        "z": 26.34,
        "year": 1885,
        "lines": [
          "G",
          "Z",
          "F",
          "JY"
        ],
        "fact": "Overlooks the world-famous Shibuya Scramble Crossing.",
        "isGhost": false
      },
      {
        "name": "Harajuku (原宿)",
        "lat": 35.6702,
        "lon": 139.7027,
        "x": -61.54,
        "z": 12.94,
        "year": 1906,
        "lines": [
          "JY"
        ],
        "fact": "Features a historic dedicated Imperial platform on the northern side and direct bridge access into Meiji Jingu.",
        "isGhost": false
      },
      {
        "name": "Yoyogi (代々木)",
        "lat": 35.683,
        "lon": 139.702,
        "x": -62.21,
        "z": -2.12,
        "year": 1906,
        "lines": [
          "E",
          "JY",
          "JB"
        ],
        "fact": "Where the Yamanote, Chuo-Sobu, and Toei Oedo lines converge south of Shinjuku.",
        "isGhost": false
      },
      {
        "name": "Shinjuku (新宿)",
        "lat": 35.69,
        "lon": 139.7004,
        "x": -63.74,
        "z": -10.35,
        "year": 1885,
        "lines": [
          "M",
          "S",
          "E",
          "JY",
          "JB"
        ],
        "fact": "Certified by Guinness World Records as the busiest railway station on Earth.",
        "isGhost": false
      },
      {
        "name": "Takadanobaba (高田馬場)",
        "lat": 35.7126,
        "lon": 139.7038,
        "x": -60.49,
        "z": -36.93,
        "year": 1910,
        "lines": [
          "JY"
        ],
        "fact": "Plays the Astro Boy theme in honor of Osamu Tezuka’s Mushi Production studios nearby.",
        "isGhost": false
      },
      {
        "name": "Ikebukuro (池袋)",
        "lat": 35.7295,
        "lon": 139.7109,
        "x": -53.7,
        "z": -56.8,
        "year": 1903,
        "lines": [
          "M",
          "Y",
          "F",
          "JY"
        ],
        "fact": "Northwestern apex of the Yamanote loop.",
        "isGhost": false
      },
      {
        "name": "Sugamo (巣鴨)",
        "lat": 35.7335,
        "lon": 139.7392,
        "x": -26.66,
        "z": -61.51,
        "year": 1903,
        "lines": [
          "I",
          "JY"
        ],
        "fact": "Connects with the Toei Mita Line.",
        "isGhost": false
      },
      {
        "name": "Komagome (駒込)",
        "lat": 35.7365,
        "lon": 139.7468,
        "x": -19.4,
        "z": -65.04,
        "year": 1910,
        "lines": [
          "N",
          "JY"
        ],
        "fact": "Birthplace of Japan’s iconic Somei-Yoshino cherry blossom tree.",
        "isGhost": false
      },
      {
        "name": "Nippori (日暮里)",
        "lat": 35.7278,
        "lon": 139.771,
        "x": 3.73,
        "z": -54.8,
        "year": 1905,
        "lines": [
          "JY"
        ],
        "fact": "Gateway to historic Yanaka.",
        "isGhost": false
      },
      {
        "name": "Ueno (上野 • with 1933 Hakubutsukan-Dobutsuen Ghost Station nearby)",
        "lat": 35.7115,
        "lon": 139.776,
        "x": 8.5,
        "z": -35.63,
        "year": 1883,
        "lines": [
          "G",
          "H",
          "JY"
        ],
        "fact": "Alongside Ueno Park stands the preserved 1933 Neoclassical pavilion of Hakubutsukan-Dobutsuen Station (closed 1997, now a cultural heritage site).",
        "isGhost": true
      },
      {
        "name": "Akihabara (秋葉原)",
        "lat": 35.6984,
        "lon": 139.7731,
        "x": 5.73,
        "z": -20.23,
        "year": 1890,
        "lines": [
          "H",
          "JY",
          "JB"
        ],
        "fact": "Where the elevated north–south Yamanote Line crosses beneath the even higher east–west Chuo-Sobu viaduct.",
        "isGhost": false
      },
      {
        "name": "Kanda (神田)",
        "lat": 35.6925,
        "lon": 139.7712,
        "x": 3.92,
        "z": -13.29,
        "year": 1919,
        "lines": [
          "G",
          "JY"
        ],
        "fact": "Elevated viaduct that linked Kanda to Ueno in 1925 to complete the Yamanote circle.",
        "isGhost": false
      },
      {
        "name": "Tokyo (東京 • Loop Closure)",
        "lat": 35.6812,
        "lon": 139.7671,
        "x": 0,
        "z": 0,
        "year": 1925,
        "lines": [
          "M",
          "JY"
        ],
        "fact": "Completes the 34.5 km circular JR Yamanote Line back into Tokyo Station.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "JB",
    "name": "JR Chūō-Sōbu Line (JR中央・総武線) — Shinjuku ↔ Yotsuya ↔ Iidabashi ↔ Ochanomizu ↔ Akihabara ↔ Ryogoku ↔ Kinshicho",
    "color": "#ffd400",
    "textColor": "#10141c",
    "openedYear": 1904,
    "rollingStockStyle": "Kobu Railway (1889) / JR East (Canary-Yellow & Vermilion Cross-City Spine)",
    "stations": [
      {
        "name": "Higashi-Nakano (東中野)",
        "lat": 35.7062,
        "lon": 139.6858,
        "x": -79.15,
        "z": -29.95,
        "year": 1906,
        "lines": [
          "E",
          "JB"
        ],
        "fact": "Western approach to Shinjuku.",
        "isGhost": false
      },
      {
        "name": "Shinjuku (新宿)",
        "lat": 35.69,
        "lon": 139.7004,
        "x": -63.74,
        "z": -10.35,
        "year": 1889,
        "lines": [
          "M",
          "S",
          "E",
          "JY",
          "JB"
        ],
        "fact": "Where the east–west Chuo-Sobu spine intersects the western side of the Yamanote loop.",
        "isGhost": false
      },
      {
        "name": "Yoyogi (代々木)",
        "lat": 35.683,
        "lon": 139.702,
        "x": -62.21,
        "z": -2.12,
        "year": 1906,
        "lines": [
          "E",
          "JY",
          "JB"
        ],
        "fact": "Transfers between Yamanote, Chuo-Sobu, and Oedo lines.",
        "isGhost": false
      },
      {
        "name": "Sendagaya (千駄ケ谷 • National Stadium)",
        "lat": 35.6812,
        "lon": 139.7115,
        "x": -53.13,
        "z": 0,
        "year": 1904,
        "lines": [
          "JB"
        ],
        "fact": "Directly opposite the Japan National Stadium and Tokyo Metropolitan Gymnasium.",
        "isGhost": false
      },
      {
        "name": "Shinanomachi (信濃町)",
        "lat": 35.6801,
        "lon": 139.7202,
        "x": -44.82,
        "z": 1.29,
        "year": 1894,
        "lines": [
          "JB"
        ],
        "fact": "Overlooks the Meiji Memorial Picture Gallery.",
        "isGhost": false
      },
      {
        "name": "Yotsuya (四ツ谷)",
        "lat": 35.686,
        "lon": 139.7302,
        "x": -35.26,
        "z": -5.65,
        "year": 1894,
        "lines": [
          "M",
          "N",
          "JB"
        ],
        "fact": "Runs along the floor of the historic outer Edo Castle moat.",
        "isGhost": false
      },
      {
        "name": "Ichigaya (市ケ谷)",
        "lat": 35.6915,
        "lon": 139.7358,
        "x": -29.91,
        "z": -12.11,
        "year": 1895,
        "lines": [
          "Y",
          "N",
          "S",
          "JB"
        ],
        "fact": "Follows the cherry-blossom-lined Sotobori moat.",
        "isGhost": false
      },
      {
        "name": "Iidabashi (飯田橋)",
        "lat": 35.7018,
        "lon": 139.7452,
        "x": -20.93,
        "z": -24.23,
        "year": 1928,
        "lines": [
          "T",
          "Y",
          "N",
          "E",
          "JB"
        ],
        "fact": "Curves along the northern moat wall toward Tokyo Dome.",
        "isGhost": false
      },
      {
        "name": "Suidobashi (水道橋 • Tokyo Dome)",
        "lat": 35.7032,
        "lon": 139.7538,
        "x": -12.71,
        "z": -25.87,
        "year": 1906,
        "lines": [
          "I",
          "JB"
        ],
        "fact": "Elevated viaduct overlooking the Kanda River and Tokyo Dome City.",
        "isGhost": false
      },
      {
        "name": "Ochanomizu (御茶ノ水)",
        "lat": 35.6998,
        "lon": 139.7652,
        "x": -1.82,
        "z": -21.87,
        "year": 1904,
        "lines": [
          "M",
          "JB"
        ],
        "fact": "Iconic three-level rail canyon where JR Chuo, JR Sobu, and Tokyo Metro Marunouchi trains cross the Kanda River.",
        "isGhost": false
      },
      {
        "name": "Akihabara (秋葉原)",
        "lat": 35.6984,
        "lon": 139.7731,
        "x": 5.73,
        "z": -20.23,
        "year": 1932,
        "lines": [
          "H",
          "JY",
          "JB"
        ],
        "fact": "Completed in 1932 to link Ochanomizu across the Yamanote Line to Ryogoku.",
        "isGhost": false
      },
      {
        "name": "Asakusabashi",
        "lat": 35.6975,
        "lon": 139.7862,
        "x": 18.25,
        "z": -19.17,
        "year": 1932,
        "lines": [
          "A",
          "JB"
        ],
        "fact": "Approaches the Sumida River steel truss railway bridge.",
        "isGhost": false
      },
      {
        "name": "Ryogoku (両国 • Sumo Kokugikan)",
        "lat": 35.6968,
        "lon": 139.7938,
        "x": 25.51,
        "z": -18.35,
        "year": 1904,
        "lines": [
          "E",
          "JB"
        ],
        "fact": "Original eastern terminus of the Sobu Railway beside the Ryogoku Kokugikan Sumo Hall.",
        "isGhost": false
      },
      {
        "name": "Kinshicho",
        "lat": 35.6962,
        "lon": 139.8142,
        "x": 45.01,
        "z": -17.64,
        "year": 1894,
        "lines": [
          "Z",
          "JB"
        ],
        "fact": "Connects with the Hanzomon Line just south of Tokyo Skytree.",
        "isGhost": false
      }
    ]
  },
  {
    "line": "U",
    "name": "Yurikamome Waterfront Line (ゆりかもめ) — Shimbashi ↔ Shiodome ↔ Rainbow Bridge Loop ↔ Odaiba ↔ Toyosu",
    "color": "#00b2e5",
    "textColor": "#ffffff",
    "openedYear": 1995,
    "rollingStockStyle": "Yurikamome Inc. (7300/7500 Series Automated Tokyo Bay Guideway)",
    "stations": [
      {
        "name": "Shimbashi (新橋)",
        "lat": 35.6664,
        "lon": 139.7583,
        "x": -8.41,
        "z": 17.41,
        "year": 1995,
        "lines": [
          "G",
          "A",
          "JY",
          "U"
        ],
        "fact": "Elevated glass-roofed terminal linking JR and subway lines to Tokyo Bay.",
        "isGhost": false
      },
      {
        "name": "Shiodome (汐留)",
        "lat": 35.6628,
        "lon": 139.7602,
        "x": -6.59,
        "z": 21.64,
        "year": 2002,
        "lines": [
          "E",
          "U"
        ],
        "fact": "Glides between the glass towers of Shiodome above the Oedo Line station.",
        "isGhost": false
      },
      {
        "name": "Takeshiba (竹芝 • Izu Islands Pier)",
        "lat": 35.6542,
        "lon": 139.7622,
        "x": -4.68,
        "z": 31.75,
        "year": 1995,
        "lines": [
          "U"
        ],
        "fact": "Overlooks the Takeshiba Passenger Ship Terminal on Tokyo Bay.",
        "isGhost": false
      },
      {
        "name": "Shibaura-futo (芝浦ふ頭 • Rainbow Bridge Spiral Loop)",
        "lat": 35.6422,
        "lon": 139.7588,
        "x": -7.93,
        "z": 45.87,
        "year": 1995,
        "lines": [
          "U"
        ],
        "fact": "Trains climb a dramatic 270-degree elevated loop over Tokyo Bay to reach the 52m-high deck of Rainbow Bridge.",
        "isGhost": false
      },
      {
        "name": "Odaiba-kaihinkoen (お台場海浜公園)",
        "lat": 35.6295,
        "lon": 139.7782,
        "x": 10.61,
        "z": 60.8,
        "year": 1995,
        "lines": [
          "U"
        ],
        "fact": "First station on Odaiba Island after crossing the Rainbow Bridge.",
        "isGhost": false
      },
      {
        "name": "Daiba (台場)",
        "lat": 35.6258,
        "lon": 139.7712,
        "x": 3.92,
        "z": 65.15,
        "year": 1995,
        "lines": [
          "U"
        ],
        "fact": "Directly in front of Kenzo Tange’s titanium-sphere Fuji Television headquarters and the Odaiba Statue of Liberty.",
        "isGhost": false
      },
      {
        "name": "Toyosu (豊洲)",
        "lat": 35.6552,
        "lon": 139.7962,
        "x": 27.81,
        "z": 30.58,
        "year": 2006,
        "lines": [
          "Y",
          "U"
        ],
        "fact": "Completed the northern arc of the Yurikamome line in 2006, connecting directly with the Tokyo Metro Yurakucho Line.",
        "isGhost": false
      }
    ]
  }
];
