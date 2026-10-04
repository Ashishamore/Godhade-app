import { useMemo, useState } from 'react'
import { Info, Minus, Plus, RotateCcw, SlidersHorizontal, TrendingUp } from 'lucide-react'
import Screen, { ScreenHeader, SectionTitle } from '../../components/Screen'
import useI18n from '../../i18n'
import { calcProducts, computeBatch, qty } from '../../data/calculator'
import { money } from '../../data/catalog'
import { Button, Card, ProductIcon, Sheet } from '../../components/ui'

const PRESETS = [5, 10, 20, 50, 100]

export default function Calculator() {
  const { t, pick } = useI18n()
  const [productId, setProductId] = useState('khawa')
  const [litres, setLitres] = useState(10)
  const [rates, setRates] = useState({})
  const [editing, setEditing] = useState(false)

  const product = calcProducts.find((p) => p.id === productId)
  const result = useMemo(() => computeBatch(product, litres, rates), [product, litres, rates])

  const setRate = (key, value) =>
    setRates((prev) => ({ ...prev, [key]: value === '' ? undefined : Number(value) }))

  return (
    <>
      <ScreenHeader
        title={t('calc.title')}
        subtitle={t('calc.subtitle')}
        actions={
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-[12.5px] font-medium text-ink transition-colors active:bg-muted"
          >
            <SlidersHorizontal className="size-4" strokeWidth={2.1} />
            {t('calc.rate')}
          </button>
        }
      />

      <Screen className="space-y-6">
        {/* ------------------------------------------------ product picker --- */}
        <section>
          <SectionTitle title={t('calc.pickProduct')} />
          <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
            {calcProducts.map((p) => {
              const active = p.id === productId
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProductId(p.id)}
                  className={[
                    'flex w-[82px] shrink-0 flex-col items-center gap-2 rounded-xl border px-1 py-2.5 transition-colors',
                    active ? 'border-brand bg-brand-soft' : 'border-line bg-surface active:bg-muted',
                  ].join(' ')}
                >
                  <ProductIcon name={p.icon} tint={p.tint} size="sm" />
                  <span
                    className={[
                      'text-[12px] font-medium',
                      active ? 'text-brand' : 'text-ink-2',
                    ].join(' ')}
                  >
                    {p.native}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ------------------------------------------------ milk quantity --- */}
        <section>
          <SectionTitle title={t('calc.milkQty')} />
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Less"
                onClick={() => setLitres((v) => Math.max(1, v - 1))}
                className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-ink-2 transition-colors active:bg-muted"
              >
                <Minus className="size-4" strokeWidth={2.6} />
              </button>

              <div className="min-w-0 flex-1 text-center">
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={litres}
                  onChange={(e) => setLitres(Math.max(1, Math.min(2000, Number(e.target.value) || 1)))}
                  className="w-full bg-transparent text-center text-[30px] font-semibold text-ink outline-none tnum"
                />
                <p className="text-[12px] text-ink-3">{t('calc.litres')}</p>
              </div>

              <button
                type="button"
                aria-label="More"
                onClick={() => setLitres((v) => Math.min(2000, v + 1))}
                className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-ink-2 transition-colors active:bg-muted"
              >
                <Plus className="size-4" strokeWidth={2.6} />
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setLitres(p)}
                  className={[
                    'flex-1 rounded-lg border py-1.5 text-[12.5px] font-medium transition-colors tnum',
                    litres === p
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-line text-ink-2 active:bg-muted',
                  ].join(' ')}
                >
                  {p}L
                </button>
              ))}
            </div>
          </Card>
        </section>

        {/* -------------------------------------------------- ingredients --- */}
        <section>
          <SectionTitle title={t('calc.ingredients')} />
          <Card className="overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-line bg-muted px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              <span>{t('calc.ingredients')}</span>
              <span className="text-right">{t('calc.qty')}</span>
              <span className="w-16 text-right">{t('calc.amount')}</span>
            </div>

            <ul className="divide-y divide-line">
              {result.lines.map((l) => (
                <li key={l.id} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-3 px-3.5 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] text-ink">{pick(l.name)}</span>
                    <span className="block text-[11px] text-ink-3 tnum">
                      {money(l.rate)}/{l.unit}
                    </span>
                  </span>
                  <span className="text-right text-[13.5px] font-medium text-ink tnum">
                    {qty(l.qty, l.unit)} {l.unit}
                  </span>
                  <span className="w-16 text-right text-[13.5px] font-semibold text-ink tnum">
                    {money(Math.round(l.amount))}
                  </span>
                </li>
              ))}

              {result.credit && (
                <li className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-3 bg-positive-soft/40 px-3.5 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] text-positive">
                      {pick(result.credit.name)}
                    </span>
                    <span className="block text-[11px] text-ink-3 tnum">
                      {money(result.credit.rate)}/{result.credit.unit}
                    </span>
                  </span>
                  <span className="text-right text-[13.5px] font-medium text-positive tnum">
                    {qty(result.credit.qty, result.credit.unit)} {result.credit.unit}
                  </span>
                  <span className="w-16 text-right text-[13.5px] font-semibold text-positive tnum">
                    −{money(Math.round(result.credit.amount))}
                  </span>
                </li>
              )}
            </ul>

            <div className="flex items-baseline justify-between border-t border-line px-3.5 py-3">
              <span className="text-[13.5px] font-semibold text-ink">{t('calc.totalCost')}</span>
              <span className="text-[16px] font-semibold text-ink tnum">
                {money(Math.round(result.netCost))}
              </span>
            </div>
          </Card>
        </section>

        {/* ------------------------------------------------------ costing --- */}
        <section>
          <SectionTitle title={t('calc.costing')} />
          <div className="grid grid-cols-2 gap-2.5">
            {[
              [t('calc.expectedYield'), `${qty(result.output, 'kg')} ${product.yieldUnit}`, null],
              [t('calc.costPerKg'), money(Math.round(result.costPerUnit)), null],
              [t('calc.suggestedPrice'), money(result.sellPerUnit) + '/' + product.yieldUnit, null],
              [
                t('calc.margin'),
                money(Math.round(result.margin)),
                result.margin >= 0 ? 'positive' : 'critical',
              ],
            ].map(([label, value, tone]) => (
              <Card key={label} className="p-3.5">
                <p className="text-[11px] uppercase tracking-[0.06em] text-ink-3">{label}</p>
                <p
                  className={[
                    'mt-1 text-[18px] font-semibold tnum',
                    tone === 'positive' ? 'text-positive' : tone === 'critical' ? 'text-critical' : 'text-ink',
                  ].join(' ')}
                >
                  {value}
                </p>
              </Card>
            ))}
          </div>

          <Card className="mt-2.5 flex items-center gap-3 p-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
              <TrendingUp className="size-[18px]" strokeWidth={2.1} />
            </span>
            <p className="min-w-0 flex-1 text-[12.5px] leading-relaxed text-ink-2">
              {pick({
                en: `At ${money(result.sellPerUnit)} per ${product.yieldUnit}, this batch returns `,
                hi: `${money(result.sellPerUnit)} प्रति ${product.yieldUnit} पर इस बैच से `,
                mr: `${money(result.sellPerUnit)} प्रति ${product.yieldUnit} दराने या बॅचमधून `,
              })}
              <strong className="font-semibold text-ink tnum">
                {money(Math.round(result.revenue))}
              </strong>
              {pick({ en: ' — a margin of ', hi: ' — मार्जिन ', mr: ' — मार्जिन ' })}
              <strong className="font-semibold text-ink tnum">
                {Math.round(result.marginPct)}%
              </strong>
              .
            </p>
          </Card>
        </section>

        <p className="flex gap-2 text-[11.5px] leading-relaxed text-ink-3">
          <Info className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} />
          {t('calc.disclaimer')}
        </p>
      </Screen>

      {/* ------------------------------------------------------ rate editor --- */}
      <Sheet
        open={editing}
        onClose={() => setEditing(false)}
        title={t('calc.rate')}
        description={t('calc.editRates')}
        footer={
          <div className="flex gap-2.5">
            <Button variant="secondary" block onClick={() => setRates({})}>
              <RotateCcw className="size-4" strokeWidth={2.2} />
              {pick({ en: 'Reset', hi: 'रीसेट', mr: 'रीसेट' })}
            </Button>
            <Button block onClick={() => setEditing(false)}>
              {t('common.save')}
            </Button>
          </div>
        }
      >
        <div className="space-y-2.5 py-1">
          {product.ingredients.map((ing) => (
            <label key={ing.id} className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] text-ink">{pick(ing.name)}</span>
                <span className="block text-[11px] text-ink-3">per {ing.unit}</span>
              </span>
              <span className="text-[13px] text-ink-3">₹</span>
              <input
                type="number"
                min="0"
                value={rates[ing.id] ?? ing.rate}
                onChange={(e) => setRate(ing.id, e.target.value)}
                className="w-20 rounded-md border border-line bg-surface px-2 py-1.5 text-right text-[13.5px] text-ink outline-none tnum focus:border-brand"
              />
            </label>
          ))}

          <label className="flex items-center gap-3 rounded-lg border border-brand/30 bg-brand-soft px-3.5 py-2.5">
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-medium text-brand">
                {t('calc.suggestedPrice')}
              </span>
              <span className="block text-[11px] text-ink-3">per {product.yieldUnit}</span>
            </span>
            <span className="text-[13px] text-ink-3">₹</span>
            <input
              type="number"
              min="0"
              value={rates[`sell:${product.id}`] ?? product.sellPerUnit}
              onChange={(e) => setRate(`sell:${product.id}`, e.target.value)}
              className="w-20 rounded-md border border-line bg-surface px-2 py-1.5 text-right text-[13.5px] text-ink outline-none tnum focus:border-brand"
            />
          </label>
        </div>
      </Sheet>
    </>
  )
}
