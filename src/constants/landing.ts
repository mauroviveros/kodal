import { Headset, LucideProps, MapPin, Palette, RefreshCcw, ShieldCheck, Smartphone } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const FEATURES_LIST: { title: string; description: string; Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> }[] = [
  {
    title: 'Acceso Instantáneo',
    description: 'Cualquier persona puede escanear el código QR y acceder inmediatamente a la información de contacto.',
    Icon: Smartphone
  },
  {
    title: 'Información Segura',
    description: 'Tus datos personales están protegidos. Solo se muestra la información necesaria para el contacto.',
    Icon: ShieldCheck
  },
  {
    title: 'Actualización en tiempo real',
    description: 'Modifica la información de tu mascota cuando quieras. Los cambios se reflejan inmediatamente.',
    
    Icon: RefreshCcw
  },
  {
    title: 'Soporte 24/7',
    description:
      'Nuestro equipo de soporte está disponible para ayudarte en cualquier momento. Contáctanos por teléfono o correo electrónico.',
    Icon: Headset
  },
  {
    title: 'Diseño Personalizado',
    description: 'Elige entre diferentes estilos de medallas físicas para que tu mascota luzca única y elegante.',
    Icon: Palette
  },
  {
    title: 'Funcionalidad de Localización',
    description: 'En caso de pérdida, la medalla puede ayudar a localizar a tu mascota a través de la comunidad y veterinarios cercanos.',
    Icon: MapPin
  },
];