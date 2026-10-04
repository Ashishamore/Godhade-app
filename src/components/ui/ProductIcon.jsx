import {
  Apple, Beaker, Beef, Blocks, CakeSlice, Candy, Carrot, ChefHat, Citrus, Coffee,
  Container, Cookie, Croissant, Dessert, Droplet, Droplets, Flame, GlassWater, Grape,
  IceCreamBowl, IceCreamCone, Milk, Nut, Package, Popsicle, Salad, Snowflake, Soup,
  Utensils, UtensilsCrossed, Wheat, CupSoda,
} from 'lucide-react'

const ICONS = {
  Apple, Beaker, Beef, Blocks, CakeSlice, Candy, Carrot, ChefHat, Citrus, Coffee,
  Container, Cookie, Croissant, Dessert, Droplet, Droplets, Flame, GlassWater, Grape,
  IceCreamBowl, IceCreamCone, Milk, Nut, Package, Popsicle, Salad, Snowflake, Soup,
  Utensils, UtensilsCrossed, Wheat, CupSoda,
}

const SIZES = {
  sm: 'size-9 rounded-lg [&>svg]:size-[18px]',
  md: 'size-12 rounded-xl [&>svg]:size-6',
  lg: 'size-16 rounded-xl [&>svg]:size-8',
  xl: 'size-20 rounded-2xl [&>svg]:size-10',
}

/**
 * Flat product tile: a solid tint wash with the icon in the same hue.
 * No gradients — the colour is the only decoration, and it carries category.
 */
export default function ProductIcon({ name, tint = '#c2410c', size = 'md', className = '' }) {
  const Glyph = ICONS[name] ?? Milk
  return (
    <span
      className={['grid shrink-0 place-items-center', SIZES[size], className].join(' ')}
      style={{ background: `color-mix(in oklab, ${tint} 13%, transparent)`, color: tint }}
    >
      <Glyph strokeWidth={1.8} />
    </span>
  )
}
