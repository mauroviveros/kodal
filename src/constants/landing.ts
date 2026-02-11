
export const SUPPORT_FREQUENTLY_ASKED_QUESTIONS: { question: string, answer: string }[] = [
  {
    question: '¿Cómo actualizo la información de mi mascota?',
    answer: 'Puedes actualizar toda la información desde la página de edición. Solo haz clic en "Editar" en el perfil de tu mascota (en la parte superior derecha) y modifica los datos que necesites.',
  },
  {
    question: '¿Qué hago si pierdo la medalla?',
    answer: 'Contacta inmediatamente con nuestro soporte para desactivar la medalla perdida y solicitar una nueva. Mientras tanto, puedes compartir el enlace del perfil digital directamente.'
  },
  {
    question: '¿La medalla funciona sin internet?',
    answer: 'La medalla necesita conexión a internet para mostrar la información actualizada.'
  }
];

export const SUPPORT_CONTACT_METHODS: { method: string, contact: string, description: string, icon: string }[] = [
  {
    method: 'Teléfono de soporte',
    contact: '+54 9 11 1234-5678',
    description: 'Lunes a Viernes, 08:00 - 18:00',
    icon: 'lucide:phone',
  },
  {
    method: 'Correo de soporte',
    contact: 'maurod.viveros@gmail.com',
    description: 'Respuesta en 24 horas',
    icon: 'lucide:mail',
  }
];

export const TERMS_OF_SERVICE: { title: string, content: string, items?: string[] }[] = [
  {
    title: 'Aceptación de los Términos',
    content: 'Al utilizar Kodal y nuestras medallas inteligentes, aceptas estos términos de servicio. Si no estás de acuerdo con alguno de estos términos, no debes usar nuestro servicio.'
  },
  {
    title: 'Descripción del Servicio',
    content: 'Kodal proporciona medallas inteligentes para mascotas que incluyen:',
    items: [
      'Perfil digital accesible mediante código QR',
      'Información de contacto del propietario',
      'Funcionalidad de localización en caso de pérdida',
    ]
  },
  {
    title: 'Responsabilidades del Usuario',
    content: 'Como usuario, eres responsable de:',
    items: [
      'Proporcionar información precisa y actualizada',
      'Usar el servicio de manera responsable y legal',
      'Notificar cambios en la información de contacto',
      'No usar el servicio para actividades ilegales o dañinas'
    ]
  },
  {
    title: 'Limitaciones del Servicio',
    content: 'Kodal es una herramienta de identificación y no garantiza la recuperación de mascotas perdidas. El servicio depende de la buena voluntad de terceros para contactar al propietario. No somos responsables por el mal uso de la información por parte de terceros.'
  },
  {
    title: 'Propiedad Intelectual',
    content: 'Todos los derechos de propiedad intelectual del servicio Kodal, incluyendo el diseño de las medallas, la plataforma digital y el contenido, son propiedad de Kodal. No se permite la reproducción, distribución o uso no autorizado de nuestro material.'
  },
  {
    title: 'Limitación de Responsabilidad',
    content: 'Kodal no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar nuestro servicio. Nuestra responsabilidad máxima se limita al costo del producto adquirido.'
  },
  {
    title: 'Modificaciones a los Términos',
    content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio será publicado en esta página y, si es significativo, se notificará a los usuarios por correo electrónico. El uso continuado del servicio después de la publicación de los cambios constituye la aceptación de los nuevos términos.'
  },
  {
    title: 'Contacto',
    content: 'Si tienes preguntas o inquietudes sobre estos términos, por favor contáctanos a través de nuestro correo de soporte: <strong>maurod.viveros@gmail.com</strong>'
  }
];
