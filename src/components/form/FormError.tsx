export const FormError = ({ method, error }: { method: 'POST' | 'PUT'; error: string }) => (
  <blockquote className="bg-destructive text-destructive-foreground rounded-lg p-4">
    <h3 className="text-base font-medium">Error al {method === 'POST' ? 'crear' : 'actualizar'} la mascota</h3>
    <p className="text-sm mt-1">{error}</p>
  </blockquote>
);
