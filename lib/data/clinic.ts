/** Información institucional — Óptica Salud Visual (OSV), Ovalle */

import { professionalProfile } from "@/lib/data/professional";

export const about = {
  whoWeAre: `OSV nace como un centro óptico de salud visual en la ciudad de Ovalle, que busca otorgar salud visual de manera amable y accesible a la Provincia del Limarí, entregando calidad en el servicio y sus productos.

Desde su inicio en diciembre de 2024, el establecimiento ha invertido en equipamiento tecnológico para un buen servicio de salud. Se han implementado líneas nuevas de armazones para satisfacer el gusto de los pacientes en calidad, apariencia y precios. Se han incorporado distintos laboratorios ópticos para tener toda la gama de cristales existentes en el mercado.`,
  mission: `Entregar una atención de salud visual completa, que va más allá de una simple receta, con enfoque biopsicosocial, de manera cercana y con principios éticos y vocación de servicio. Tener una alta variedad de armazones y cristales para satisfacer las necesidades de toda la población.`,
  vision: `Ser reconocidos como un centro óptico accesible a todo tipo de pacientes, con armazones y cristales de todo tipo, para cualquier gusto y bolsillo. Un establecimiento con vocación para el cuidado de tus ojos.`,
  founded: "Diciembre 2024",
} as const;

/** Solo datos de exámenes — sin repetir FONASA/2024 del hero */
export const examHighlights = [
  {
    value: "5",
    label: "procedimientos en consulta",
  },
  {
    value: "Retinografía",
    label: "sin dilatación pupilar",
  },
  {
    value: "Titmus",
    label: "evaluación de profundidad",
  },
] as const;

export const exams = [
  {
    id: "refraccion",
    title: "Refracción",
    description:
      "Procedimiento para obtener la receta del lente a través de agudeza visual y autorrefractometría.",
    detail:
      "Medimos tu graduación con agudeza visual, prueba subjetiva y autorrefractometría para una receta precisa y cómoda.",
    tag: "Receta óptica",
    duration: "~20 min",
  },
  {
    id: "tonometria",
    title: "Tonometría aplanática",
    description:
      "Toma de presión intraocular. Procedimiento levemente invasivo que requiere anestesia y colorante.",
    detail:
      "Control de presión intraocular con técnica aplanática. Requiere anestesia tópica y colorante; es clave en el seguimiento de glaucoma.",
    tag: "Presión ocular",
    duration: "~10 min",
  },
  {
    id: "retinografia",
    title: "Retinografía",
    description:
      "Foto al fondo de ojo con cámara retinal no midriática. No requiere dilatación pupilar.",
    detail:
      "Registro digital del fondo de ojo sin dilatar la pupila: documentamos retina y nervio óptico en la misma visita.",
    tag: "Sin midriasis",
    duration: "~15 min",
  },
  {
    id: "sensoriomotora",
    title: "Evaluación sensoriomotora",
    description:
      "Tests visuales para detectar desviaciones oculares (estrabismo) y anomalías de la visión binocular.",
    detail:
      "Batería de pruebas para detectar estrabismo, alteraciones de la visión binocular y coordinación entre ambos ojos.",
    tag: "Visión binocular",
    duration: "~25 min",
  },
  {
    id: "estereopsis",
    title: "Test de estereopsis",
    description:
      "Medición de la visión en profundidad a través del test de Titmus.",
    detail:
      "Evaluamos la percepción de profundidad con el test de Titmus, útil en niños y adultos con sospecha de ambliopía.",
    tag: "Profundidad",
    duration: "~10 min",
  },
] as const;

export type ExamId = (typeof exams)[number]["id"];

export const services = [
  {
    id: "atencion-tmo",
    title: "Atención oftalmológica",
    description:
      "Consulta y seguimiento por Tecnólogo Médico en Oftalmología, con evaluación clínica completa.",
    detail:
      "Desde el examen visual hasta la orientación sobre tu salud ocular, con trato cercano y enfoque biopsicosocial.",
    category: "Clínica",
  },
  {
    id: "receta",
    title: "Despacho de receta médica",
    description:
      "Entrega y asesoría de tu receta para armazones y cristales en el mismo centro.",
    detail:
      "Te ayudamos a entender tu graduación y a elegir armazón y cristales según tu estilo de vida y presupuesto.",
    category: "Productos",
  },
  {
    id: "operativos",
    title: "Operativos visuales",
    description:
      "Exámenes y campañas para empresas, juntas de vecinos y organizaciones de la comunidad.",
    detail:
      "Llevamos salud visual a tu empresa o barrio con operativos coordinados y atención grupal.",
    category: "Comunidad",
  },
  {
    id: "certificados",
    title: "Certificados y trámites",
    description:
      "Documentación para COMPIN, Tránsito, colegios y exámenes preocupacionales.",
    detail:
      "COMPIN, Departamento de Tránsito, establecimientos educacionales y entidades como CDT, ACHS y Workmed.",
    category: "Certificación",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const professional = {
  name: professionalProfile.name,
  title: professionalProfile.title,
  institution: professionalProfile.institution,
} as const;

export const frameProducts = [
  "Armazones premium de marcas reconocidas",
  "Armazones gama alta",
  "Armazones línea básica",
  "Antiparras y armazones de seguridad",
  "Armazones flexibles para niños",
  "Armazones al aire (rimless)",
  "Lentes de sol (niño y adulto)",
  "Lentes de lectura",
  "Lentes de descanso (filtro azul)",
  "Lentes clip-on",
] as const;

export const lensTreatments = [
  "Antirreflejo",
  "Filtro azul",
  "Fotocromático",
  "Teñido ámbar / rosa",
  "Polarizados",
  "Adelgazado normal (índice 1.67)",
  "Extra adelgazado (índice 1.74)",
  "Filtro UV",
  "Antiempañante",
] as const;

export const lensMaterials = ["Mineral", "Orgánico (CR-39)", "Policarbonato"] as const;

/** Distinto al hero — sin repetir FONASA ni 2024 */
export const clinicHighlights = [
  {
    value: "TMO",
    label: "Tecnólogo Médico en Oftalmología en cada evaluación.",
  },
  {
    value: "Laboratorios",
    label: "Varios laboratorios para toda la gama de cristales.",
  },
  {
    value: "Comunidad",
    label: "Operativos visuales para empresas y organizaciones.",
  },
  {
    value: "Horario",
    label: "Lunes a sábado con atención en Coquimbo #177.",
  },
] as const;

export const schedule = [
  {
    day: "Lunes – Jueves",
    morning: "09:30 – 14:30",
    afternoon: "15:00 – 19:30",
  },
  {
    day: "Viernes",
    morning: "09:30 – 14:30",
    afternoon: "15:00 – 18:00",
  },
  {
    day: "Sábado",
    morning: "10:30 – 14:00",
    afternoon: "—",
  },
  {
    day: "Domingo",
    morning: "Cerrado",
    afternoon: "—",
  },
] as const;
