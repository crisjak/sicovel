/**
 * SICOVE - Datos del sitio
 * Ahora lee desde el JSON editable via el panel admin.
 * Este archivo mantiene compatibilidad con los componentes existentes.
 */

import { getData } from './data'
import type { HomepageData } from '@/types/content'

export const homepageData: HomepageData = getData()
