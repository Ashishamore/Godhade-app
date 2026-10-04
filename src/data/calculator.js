/* ---------------------------------------------------------------------------
   Batch calculator model.

   Everything scales from one input: litres of milk. Each product declares how
   much of each ingredient it needs per litre, how much finished product comes
   out, and what by-product is left over (skim milk after ghee, whey after
   paneer). Crediting the by-product is what makes the per-kg cost honest —
   without it ghee looks like it runs at a loss.

   Rates are defaults. The UI lets the student override them with local prices.
--------------------------------------------------------------------------- */

const n = (en, hi, mr) => ({ en, hi, mr })

export const calcProducts = [
  {
    id: 'khawa',
    native: 'खवा',
    name: n('Khawa', 'खवा', 'खवा'),
    icon: 'Cookie',
    tint: '#8a5a08',
    yieldPerLitre: 0.19,
    yieldUnit: 'kg',
    sellPerUnit: 420,
    ingredients: [
      { id: 'milk', name: n('Cow milk', 'गाय का दूध', 'गाईचे दूध'), perLitre: 1, unit: 'L', rate: 55 },
      { id: 'fuel', name: n('Fuel / gas', 'ईंधन / गैस', 'इंधन / गॅस'), perLitre: 0.09, unit: 'kg', rate: 58 },
    ],
    byproduct: null,
  },
  {
    id: 'paneer',
    native: 'पनीर',
    name: n('Paneer', 'पनीर', 'पनीर'),
    icon: 'Blocks',
    tint: '#15724a',
    yieldPerLitre: 0.17,
    yieldUnit: 'kg',
    sellPerUnit: 380,
    ingredients: [
      { id: 'milk', name: n('Cow milk', 'गाय का दूध', 'गाईचे दूध'), perLitre: 1, unit: 'L', rate: 55 },
      { id: 'citric', name: n('Citric acid', 'सिट्रिक एसिड', 'सिट्रिक अ‍ॅसिड'), perLitre: 0.002, unit: 'kg', rate: 180 },
      { id: 'fuel', name: n('Fuel / gas', 'ईंधन / गैस', 'इंधन / गॅस'), perLitre: 0.04, unit: 'kg', rate: 58 },
      { id: 'pack', name: n('Packing film', 'पैकिंग फ़िल्म', 'पॅकिंग फिल्म'), perLitre: 0.17, unit: 'pc', rate: 3 },
    ],
    byproduct: { name: n('Whey sold', 'व्हे बिक्री', 'व्हे विक्री'), perLitre: 0.75, unit: 'L', rate: 6 },
  },
  {
    id: 'basundi',
    native: 'बासुंदी',
    name: n('Basundi', 'बासुंदी', 'बासुंदी'),
    icon: 'Dessert',
    tint: '#8a3b8a',
    yieldPerLitre: 0.4,
    yieldUnit: 'kg',
    sellPerUnit: 320,
    ingredients: [
      { id: 'milk', name: n('Cow milk', 'गाय का दूध', 'गाईचे दूध'), perLitre: 1, unit: 'L', rate: 55 },
      { id: 'sugar', name: n('Sugar', 'चीनी', 'साखर'), perLitre: 0.08, unit: 'kg', rate: 45 },
      { id: 'dryfruit', name: n('Dry fruits', 'ड्राई फ्रूट', 'सुका मेवा'), perLitre: 0.015, unit: 'kg', rate: 850 },
      { id: 'cardamom', name: n('Cardamom', 'इलायची', 'वेलची'), perLitre: 0.001, unit: 'kg', rate: 2400 },
      { id: 'fuel', name: n('Fuel / gas', 'ईंधन / गैस', 'इंधन / गॅस'), perLitre: 0.07, unit: 'kg', rate: 58 },
      { id: 'bottle', name: n('Bottle & label', 'बोतल और लेबल', 'बाटली व लेबल'), perLitre: 0.8, unit: 'pc', rate: 7 },
    ],
    byproduct: null,
  },
  {
    id: 'shrikhand',
    native: 'श्रीखंड',
    name: n('Shrikhand', 'श्रीखंड', 'श्रीखंड'),
    icon: 'CakeSlice',
    tint: '#a8761a',
    yieldPerLitre: 0.55,
    yieldUnit: 'kg',
    sellPerUnit: 340,
    ingredients: [
      { id: 'milk', name: n('Cow milk', 'गाय का दूध', 'गाईचे दूध'), perLitre: 1, unit: 'L', rate: 55 },
      { id: 'culture', name: n('Culture', 'जामन', 'विरजण'), perLitre: 0.01, unit: 'kg', rate: 90 },
      { id: 'sugar', name: n('Sugar', 'चीनी', 'साखर'), perLitre: 0.26, unit: 'kg', rate: 45 },
      { id: 'cardamom', name: n('Cardamom', 'इलायची', 'वेलची'), perLitre: 0.0012, unit: 'kg', rate: 2400 },
      { id: 'cup', name: n('Cup & lid', 'कप और ढक्कन', 'कप व झाकण'), perLitre: 1.1, unit: 'pc', rate: 4 },
    ],
    byproduct: { name: n('Whey sold', 'व्हे बिक्री', 'व्हे विक्री'), perLitre: 0.5, unit: 'L', rate: 6 },
  },
  {
    id: 'dahi',
    native: 'दही',
    name: n('Dahi', 'दही', 'दही'),
    icon: 'Soup',
    tint: '#1b4f8a',
    yieldPerLitre: 1,
    yieldUnit: 'kg',
    sellPerUnit: 80,
    ingredients: [
      { id: 'milk', name: n('Cow milk', 'गाय का दूध', 'गाईचे दूध'), perLitre: 1, unit: 'L', rate: 55 },
      { id: 'culture', name: n('Culture', 'जामन', 'विरजण'), perLitre: 0.01, unit: 'kg', rate: 90 },
      { id: 'cup', name: n('Cup & lid', 'कप और ढक्कन', 'कप व झाकण'), perLitre: 2, unit: 'pc', rate: 4 },
      { id: 'fuel', name: n('Fuel / gas', 'ईंधन / गैस', 'इंधन / गॅस'), perLitre: 0.02, unit: 'kg', rate: 58 },
    ],
    byproduct: null,
  },
  {
    id: 'tup',
    native: 'तूप',
    name: n('Pure ghee', 'शुद्ध घी', 'शुद्ध तूप'),
    icon: 'Flame',
    tint: '#a8761a',
    yieldPerLitre: 0.04,
    yieldUnit: 'kg',
    sellPerUnit: 900,
    ingredients: [
      { id: 'milk', name: n('Cow milk', 'गाय का दूध', 'गाईचे दूध'), perLitre: 1, unit: 'L', rate: 55 },
      { id: 'fuel', name: n('Fuel / gas', 'ईंधन / गैस', 'इंधन / गॅस'), perLitre: 0.05, unit: 'kg', rate: 58 },
      { id: 'jar', name: n('Jar & label', 'जार और लेबल', 'जार व लेबल'), perLitre: 0.08, unit: 'pc', rate: 18 },
    ],
    byproduct: { name: n('Skim milk sold', 'स्किम दूध बिक्री', 'स्किम दूध विक्री'), perLitre: 0.94, unit: 'L', rate: 30 },
  },
]

export const calcProductById = (id) => calcProducts.find((p) => p.id === id)

/** Scale a product to a milk volume and work out the economics. */
export function computeBatch(product, litres, rateOverrides = {}) {
  const rate = (ing) => rateOverrides[ing.id] ?? ing.rate

  const lines = product.ingredients.map((ing) => {
    const raw = ing.perLitre * litres
    // Packaging is bought in whole units — you cannot buy 0.8 of a jar, and
    // charging for 0.8 while the row reads "1 pc" makes the costing wrong.
    const qty = ing.unit === 'pc' ? Math.ceil(raw) : raw
    return { ...ing, qty, rate: rate(ing), amount: qty * rate(ing) }
  })

  const grossCost = lines.reduce((sum, l) => sum + l.amount, 0)

  const credit = product.byproduct
    ? {
        ...product.byproduct,
        qty: product.byproduct.perLitre * litres,
        rate: rateOverrides[`by:${product.id}`] ?? product.byproduct.rate,
      }
    : null
  if (credit) credit.amount = credit.qty * credit.rate

  const netCost = grossCost - (credit?.amount ?? 0)
  const output = product.yieldPerLitre * litres
  const costPerUnit = output > 0 ? netCost / output : 0
  const sellPerUnit = rateOverrides[`sell:${product.id}`] ?? product.sellPerUnit
  const revenue = output * sellPerUnit

  return {
    lines,
    credit,
    grossCost,
    netCost,
    output,
    costPerUnit,
    sellPerUnit,
    revenue,
    margin: revenue - netCost,
    marginPct: revenue > 0 ? ((revenue - netCost) / revenue) * 100 : 0,
  }
}

/** 2 decimals for small quantities, whole numbers for large ones. */
export function qty(v, unit) {
  if (unit === 'pc') return Math.ceil(v).toString()
  if (v >= 100) return Math.round(v).toString()
  if (v >= 10) return v.toFixed(1)
  if (v >= 1) return v.toFixed(2)
  return v.toFixed(3)
}
