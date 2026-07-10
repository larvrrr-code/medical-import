import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface EquipmentCategoryCard {
  id: number
  name: string
  slug: string
  short_desc?: string | null
  image_url?: string | null
}

interface Props {
  categories: EquipmentCategoryCard[]
}

export function EquipmentParentCards({ categories }: Props) {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/equipos/${category.slug}`}
          className="group grid overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#132EEF]/20 hover:shadow-md md:grid-cols-[40%_60%]"
        >
          <div className="relative min-h-56 overflow-hidden bg-[#EEF3FA] md:min-h-64">
            {category.image_url ? (
              <img
                src={category.image_url}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full min-h-56 items-center justify-center text-[#132EEF]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-3xl font-black">MI</span>
                </div>
              </div>
            )}
            <div className="absolute inset-y-0 right-[-1px] hidden w-20 skew-x-[-12deg] bg-white md:block" />
          </div>

          <div className="flex min-h-56 flex-col justify-center p-6 md:p-10">
            <h3 className="text-3xl font-black leading-tight text-[#141E61] sm:text-4xl">
              {category.name}
            </h3>
            {category.short_desc && (
              <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-gray-500 sm:text-lg">
                {category.short_desc}
              </p>
            )}
            <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#132EEF] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 group-hover:bg-[#141E61]">
              Ver subcategorias
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
