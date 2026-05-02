/**
 * PRICE STORAGE UTILITY
 * Threads Beauty Bar & Spa
 *
 * Import this in any component that needs prices.
 * Admin panel writes here → Main site reads from here.
 */

export const STORAGE_KEY = "threads_prices_v1";

export const CATEGORIES = ["Threading","Facials","Waxing","Hair","Massage","Henna"];

export const DEFAULT_PRICES = {
  Threading: [
    { id:"t1",  name:"Eyebrows",                        price:"$15" },
    { id:"t2",  name:"Eyebrow + Upper Lip",              price:"$21" },
    { id:"t3",  name:"Upper Lip",                        price:"$10" },
    { id:"t4",  name:"Chin",                             price:"$10" },
    { id:"t5",  name:"Full Chin",                        price:"$12" },
    { id:"t6",  name:"Cheeks",                           price:"$12" },
    { id:"t7",  name:"Forehead",                         price:"$10" },
    { id:"t8",  name:"Forehead Sides",                   price:"$5"  },
    { id:"t9",  name:"Sideburns",                        price:"$12" },
    { id:"t10", name:"Neck",                             price:"$12" },
    { id:"t11", name:"Full Face",                        price:"$50" },
    { id:"t12", name:"Full Face + Full Chin",            price:"$60" },
  ],
  Facials: [
    { id:"f1",  name:"Express Facial (25 min)",          price:"$55"  },
    { id:"f2",  name:"Signature Facial (50 min)",        price:"$90"  },
    { id:"f3",  name:"Indulgence Facial (80 min)",       price:"$150" },
    { id:"f4",  name:"Hydra Facial (90 min)",            price:"$175" },
    { id:"f5",  name:"Vitamin C Add-on",                 price:"Call" },
    { id:"f6",  name:"Moisture Infusion",                price:"Add-on" },
    { id:"f7",  name:"Detoxifying",                      price:"Add-on" },
    { id:"f8",  name:"Anti-Aging",                       price:"Add-on" },
    { id:"f9",  name:"Microdermabrasion",                price:"Call" },
  ],
  Waxing: [
    { id:"w1",  name:"Eyebrows",                         price:"$20"     },
    { id:"w2",  name:"Upper Lip",                        price:"$12"     },
    { id:"w3",  name:"Full Face with Brows",             price:"$60"     },
    { id:"w4",  name:"Full Face without Brows",          price:"$45"     },
    { id:"w5",  name:"Cheeks",                           price:"$15"     },
    { id:"w6",  name:"Chin / Full Chin",                 price:"$12/$15" },
    { id:"w7",  name:"Sideburns",                        price:"$15"     },
    { id:"w8",  name:"Nose Waxing (outer)",              price:"$9"      },
    { id:"w9",  name:"Nostril Waxing (inner)",           price:"$16"     },
    { id:"w10", name:"Neck Front",                       price:"$15"     },
    { id:"w11", name:"Neck Back",                        price:"$20"     },
    { id:"w12", name:"Under Arms",                       price:"$25"     },
    { id:"w13", name:"Half Arms / Full Arms",            price:"$35/$45" },
    { id:"w14", name:"Shoulders",                        price:"$15"     },
    { id:"w15", name:"Half Back / Full Back",            price:"$35/$60" },
    { id:"w16", name:"Chest / Stomach",                  price:"$35"     },
    { id:"w17", name:"Navel Line",                       price:"$10"     },
    { id:"w18", name:"Half Legs / Full Legs",            price:"$30/$65" },
    { id:"w19", name:"Bikini Basic",                     price:"$30"     },
    { id:"w20", name:"Bikini Basic Plus",                price:"$40"     },
    { id:"w21", name:"Brazilian (Bikini Full)",          price:"$70"     },
  ],
  Hair: [
    { id:"h1",  name:"Women's Cut",                      price:"$70+"  },
    { id:"h2",  name:"Men's Cut",                        price:"$25"   },
    { id:"h3",  name:"Full Color",                       price:"$90+"  },
    { id:"h4",  name:"Root Touch-Up",                    price:"$70+"  },
    { id:"h5",  name:"Cut & Color",                      price:"$120+" },
    { id:"h6",  name:"Shampoo & Blow Dry",               price:"$50+"  },
    { id:"h7",  name:"Bang Trim / Cut Bangs",            price:"$10"   },
    { id:"h8",  name:"Partial Highlights",               price:"$125+" },
    { id:"h9",  name:"Full Highlights",                  price:"$145+" },
    { id:"h10", name:"Color Glaze",                      price:"$55+"  },
    { id:"h11", name:"Flat Ironing",                     price:"$55+"  },
    { id:"h12", name:"Style Updo",                       price:"$65+"  },
    { id:"h13", name:"Style Partial Updo",               price:"$70+"  },
    { id:"h14", name:"Style Curls Only",                 price:"$55+"  },
    { id:"h15", name:"Deep Condition (no style)",        price:"$55+"  },
    { id:"h16", name:"Deep Condition (with style)",      price:"$70+"  },
    { id:"h17", name:"Hair Retexturing",                 price:"$360+" },
    { id:"h18", name:"Scalp Treatment",                  price:"$55+"  },
    { id:"h19", name:"Corrective Color",                 price:"$90/hr"},
    { id:"h20", name:"Bleach & Tone Touch Up",           price:"Call"  },
    { id:"h21", name:"Extensions",                       price:"Call"  },
    { id:"h22", name:"Bridal Hair & Makeup",             price:"Call"  },
  ],
  Massage: [
    { id:"m1",  name:"10 min — With Oil",                price:"$25" },
    { id:"m2",  name:"15 min — With Oil",                price:"$30" },
    { id:"m3",  name:"20 min — With Oil",                price:"$35" },
    { id:"m4",  name:"30 min — With Oil (private room)", price:"$55" },
    { id:"m5",  name:"10 min — Without Oil",             price:"$20" },
    { id:"m6",  name:"15 min — Without Oil",             price:"$25" },
    { id:"m7",  name:"20 min — Without Oil",             price:"$30" },
    { id:"m8",  name:"30 min — Without Oil",             price:"$50" },
  ],
  Henna: [
    { id:"n1",  name:"X-Small Design",                   price:"$10"    },
    { id:"n2",  name:"Large Design",                     price:"$40"    },
    { id:"n3",  name:"Larger Scope / Custom Work",       price:"$75/hr" },
    { id:"n4",  name:"Travel Events (per artist)",       price:"$75/hr" },
  ],
};

/** Load prices — from localStorage if admin has saved, otherwise defaults */
export function loadPrices() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PRICES;
    const parsed = JSON.parse(saved);
    // Merge saved prices with defaults (so new items always appear)
    const merged = {};
    for (const cat of CATEGORIES) {
      merged[cat] = DEFAULT_PRICES[cat].map(item => {
        const savedItem = (parsed[cat] || []).find(s => s.id === item.id);
        return savedItem ? { ...item, price: savedItem.price } : item;
      });
    }
    return merged;
  } catch {
    return DEFAULT_PRICES;
  }
}

/** Save prices to localStorage */
export function savePrices(prices) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
    return true;
  } catch {
    return false;
  }
}

/** Reset prices to defaults */
export function resetPrices() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
